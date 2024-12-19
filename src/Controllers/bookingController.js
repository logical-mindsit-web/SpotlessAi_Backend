import Booking from "../Models/BookingSession-Model.js";
import moment from "moment";

const isSunday = (date) => moment(date).day() === 0;

const addWorkingDays = (startDate, days) => {
  let newDate = moment(startDate).clone();
  let addedDays = 0;
  while (addedDays < Math.abs(days)) {
    newDate.add(days > 0 ? 1 : -1, "days");
    if (!isSunday(newDate)) addedDays++;
  }
  return newDate;
};

const getBlockedDatesForCustomer = (bookingDate) => {
  const customerBlockedDates = [];
  let tempDate = moment.utc(bookingDate);

  customerBlockedDates.push(tempDate.format("YYYY-MM-DD"));
  console.log("Booking date added:", tempDate.format("YYYY-MM-DD"));

  let pastCount = 0;
  while (pastCount < 4) {
    tempDate = addWorkingDays(tempDate, -1);
    if (!customerBlockedDates.includes(tempDate.format("YYYY-MM-DD"))) {
      customerBlockedDates.push(tempDate.format("YYYY-MM-DD"));
      pastCount++;
      console.log(
        `Past blocked date ${pastCount}:`,
        tempDate.format("YYYY-MM-DD")
      );
    }
  }

  tempDate = moment.utc(bookingDate);
  console.log("Reset to booking date:", tempDate.format("YYYY-MM-DD"));

  for (let i = 0; i < 4; i++) {
    tempDate = addWorkingDays(tempDate, 1);
    customerBlockedDates.push(tempDate.format("YYYY-MM-DD"));
    console.log(`Future blocked date ${i + 1}:`, tempDate.format("YYYY-MM-DD"));
  }

  return customerBlockedDates;
};

export const bookSession = async (req, res) => {
  try {
    const { name, email, mobileNumber, companyName, address, bookedDate } =
      req.body;
    console.log("customer request ", req.body);

    const bookingDate = moment.utc(bookedDate, "YYYY-MM-DD").startOf("day");
    console.log("customer selected date ", bookingDate);

    if (!bookingDate.isValid()) {
      return res.status(400).json({ message: "Invalid booking date format." });
    }

    if (isSunday(bookingDate)) {
      return res
        .status(400)
        .json({ message: "Booking only Monday to Saturday available." });
    }

    const nextBlockedDates = [];
    let tempDate = moment.utc().startOf("day");
    for (let i = 0; i < 4; i++) {
      tempDate = addWorkingDays(tempDate, 1);
      nextBlockedDates.push(tempDate.format("YYYY-MM-DD"));
    }
    console.log(
      "current date and upcoming next 4 working days blocked dates: ",
      nextBlockedDates
    );

    if (nextBlockedDates.includes(bookingDate.format("YYYY-MM-DD"))) {
      return res
        .status(400)
        .json({ message: "Booking is not allowed for the selected date." });
    }

    const customerBlockedDates = getBlockedDatesForCustomer(bookingDate);

    const newBooking = new Booking({
      customer: {
        name,
        email,
        mobileNumber,
        companyName,
        address,
        bookedDate: bookingDate.toDate(),
        customerBlockedDates: customerBlockedDates.map((date) =>
          moment.utc(date).toDate()
        ),
      },
    });

    await newBooking.save();
    return res
      .status(200)
      .json({ message: "Booking successful.", booking: newBooking });
  } catch (error) {
    console.error("Booking Error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

export const getBlockedDates = async (req, res) => {
  try {
    const blockedDates = [];
    let currentDate = moment.utc().startOf("day");
    console.log("today currentdate is ", currentDate);

    blockedDates.push(currentDate.format("YYYY-MM-DD"));
    console.log(
      "current date added to block",
      currentDate.format("YYYY-MM-DD")
    );

    for (let i = 0; i < 4; i++) {
      currentDate = addWorkingDays(currentDate, 1);
      blockedDates.push(currentDate.format("YYYY-MM-DD"));
    }

    const existingBookings = (await Booking.find().lean()) || [];

    const allCustomerBlockedDates = existingBookings.flatMap((booking) =>
      booking.customer.customerBlockedDates.map((date) =>
        moment(date).format("YYYY-MM-DD")
      )
    );

    console.log(
      "All customer-specific blocked dates: ",
      allCustomerBlockedDates
    );

    return res.status(200).json({
      blockedDates,
      customerBlockedDates: allCustomerBlockedDates,
    });
  } catch (error) {
    console.error("Error fetching blocked dates:", error.message);
    return res.status(500).json({
      message: "Server error.",
      error: error.message,
    });
  }
};