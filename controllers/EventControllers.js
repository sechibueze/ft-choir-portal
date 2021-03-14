const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const Event = require("../models/Event");
const getExcelToJSON = require("../helpers/excelToJSON");
// const Member = require("../models/Member");
// const EmailService = require("../helpers/sendEmail");

const getEvents = (req, res) => {
  let query = Event.find({ visibility: true });
  const { id, access } = req.query;
  if (id) query = Event.findOne({ visibility: true, _id: id });
  if (access) query = Event.find({ "attendance.access": access });

  query
    .exec()
    .then((list) => {
      return res.status(200).json({
        status: true,
        message: "Events list",
        data: list,
      });
    })
    .catch((e) => {
      return res.status(500).json({
        status: false,
        message: "Failed to retrieve allow list",
        data: e,
      });
    });
};

const uploadAttendance = (req, res) => {
  const exceltojson = getExcelToJSON(req);
  const { eventId } = req.body;
  let filter = { _id: eventId };
  Event.findOne(filter)
    .then((event) => {
      if (!event) {
        return res.status(401).json({
          status: false,
          message: "Data not found",
          data: event,
        });
      }
      exceltojson(
        {
          input: req.file.path,
          output: null,
          lowerCaseHeaders: false,
        },
        function (err, results) {
          if (err) {
            return res.status(500).json({
              status: false,
              message: "Failed to upload attendance",
              data: err,
            });
          }
          console.log("u res ", results);
          event.attendance = results.filter((att) => {
            return {
              access: att.access,
              firstname: att.firstname,
              lastname: att.lastname,
              location: att.location,
            };
          });

          console.log("u res att", event.attendance);
          event.save((err) => {
            if (err) {
              return res.status(500).json({
                status: false,
                message: "Failed to save event attendance",
                data: err,
              });
            }

            return res.status(200).json({
              status: true,
              message: "Attendance uploaded",
              data: event,
            });
          });
        }
      );
    })
    .catch((e) => {
      return res.status(500).json({
        status: false,
        message: "Server error: ",
        data: e,
      });
    });
};

const createEvent = (req, res) => {
  // validate input
  const { name, caption, event_date, category } = req.body;
  if (!name || !caption || !event_date || !category) {
    return res.status(422).json({
      status: false,
      message: "Validation errors",
      data: req.body,
    });
  }

  const newEvent = new Event({ name, caption, event_date, category });

  newEvent.save((err) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Failed to create events",
        data: err,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Access added",
      data: newEvent,
    });
  });
};

const updateEvent = (req, res) => {
  Event.findOne({ _id: req.body._id })
    .then((event) => {
      if (!event) {
        return res.status(404).json({
          status: false,
          message: "Event not found",
          data: err,
        });
      }
      const { name, caption, event_date, category } = req.body;

      if (name) event.name = name;
      if (caption) event.caption = caption;
      if (event_date) event.event_date = event_date;
      if (category) event.category = category;

      event.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Failed to update event",
            data: err,
          });
        }

        return res.status(200).json({
          status: true,
          message: "Event updated",
          data: event,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Failed to find event",
        data: err,
      });
    });
};

const updateEventVisibility = (req, res) => {
  Event.findOne({ _id: req.body._id })
    .then((event) => {
      if (!event) {
        return res.status(404).json({
          status: false,
          message: "Event not found",
          data: err,
        });
      }
      const { name, caption, event_date, category } = req.body;

      if (name) event.name = name;
      if (caption) event.caption = caption;
      if (event_date) event.event_date = event_date;
      if (category) event.category = category;

      event.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Failed to update event",
            data: err,
          });
        }

        return res.status(200).json({
          status: true,
          message: "Event updated",
          data: event,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Failed to find event",
        data: err,
      });
    });
};

// const purgeAllowList = (req, res) => {
//   AllowList.deleteMany({})
//     .then((list) => {
//       return res.status(200).json({
//         status: true,
//         message: "Allowed list deleted",
//         data: list,
//       });
//     })
//     .catch((e) => {
//       return res.status(500).json({
//         status: false,
//         error: "Failed to purge allow list",
//         data: e,
//       });
//     });
// };

const deleteEvents = (req, res) => {
  let filter = {};
  const { id } = req.query;
  const { events } = req.body;

  if (id) filter._id = id;
  if (events) filter = { _id: { $in: events } };

  Event.find(filter)
    .then((results) => {
      if (results.length < 1) {
        return res.status(404).json({
          status: false,
          message: "No event found",
          data: results,
        });
      }

      results.map(async (event) => await event.remove());
      return res.status(200).json({
        status: true,
        message: "Events deleted",
        data: results,
      });
    })
    .catch((e) => {
      return res.status(500).json({
        status: false,
        message: "Failed to delete access",
        data: e,
      });
    });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  uploadAttendance,
  deleteEvents,
};
