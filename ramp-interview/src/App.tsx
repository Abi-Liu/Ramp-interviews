import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import { Event, FormData } from "./types";

/*
Calendar App
Implement a clone of Google Calendar’s day view that allows creating, editing, and deleting events.


Specifications:
1. Show date for the day at the top, as well as 24 1-hour blocks in one column. Labels for hours should be displayed on the left beside each block.
2. An event is a rectangle that spans one or multiple hour blocks.
   * Assume event start/end times are EXACTLY on the hour (eg. 2pm-5pm, but don’t need to handle 2:03pm-5:07pm).
3. Add a header below today’s date with 3 inputs at the top of the page. The header has 3 inputs (start time, end time, name) and a save button.
   * Saving creates the event and clears the input fields.
   * The start time input’s default value is populated by the hour corresponding to which empty hour block you clicked on.
4. Clicking an existing event should autofill the header inputs to edit event details (start time, end time, and name only)
   * The start/end/name inputs are updated with the event’s current details.
   * When clicking save, the calendar updates.
   * When editing an existing event, there should be a button to delete the event.
   * Deleting an event clears the input fields.
Notes:
* Primary goal is functionality, not styling. Don’t worry about copying Google Calendar styles.
* It may be easier to use number instead of Date to represent time
General:
* You can use Google to look up documentation, articles, and code examples.
* You may install and use libraries for styling and state management.
* TypeScript is not required
*/

// inputs always valid
// events can overlap
// 24 blocks, dont worry about making it pretty
// 1 long column with 24 blocks

function generateUUID() {
  return Math.floor(Math.random() * 1000);
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    startTime: "",
    endTime: "",
    name: "",
  });
  const [events, setEvents] = useState<Event[]>([]);
  const date = new Date();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const hours: (Event | null)[] = Array(24).fill(null);

  events.forEach((event) => {
    hours[Number(event.startTime)] = event;
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selectedEvent) {
      setEvents((prev) => prev.filter((x) => x.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
    setEvents((prev) => [...prev, { ...formData, id: generateUUID() }]);
    setFormData({ startTime: "", endTime: "", name: "" });
  }

  function handleBlockClick(hour: Event | null) {
    if (hour) {
      setSelectedEvent(hour);
      setFormData({
        startTime: hour.startTime,
        endTime: hour.endTime,
        name: hour.name,
      });
    }
  }

  return (
    <div>
      <header>
        <p>{date.toDateString()}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="start-time">Start time: </label>
          <input
            type="text"
            name="startTime"
            id="start-time"
            value={formData["startTime"]}
            onChange={handleChange}
          />
          <label htmlFor="end-time">End time: </label>
          <input
            type="text"
            name="endTime"
            id="end-time"
            value={formData["endTime"]}
            onChange={handleChange}
          />
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData["name"]}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </header>
      <div>
        {hours.map((hour, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              cursor: hour ? "pointer" : "",
            }}
            onClick={() => handleBlockClick(hour)}
          >
            <div>{i}</div>
            <div
              style={{
                width: "150px",
                height: "100px",
                border: "1px solid black",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  height: hour
                    ? `${
                        100 * Number(hour?.endTime) - Number(hour?.startTime)
                      }px`
                    : "100px",
                  width: "150px",
                  backgroundColor: "teal",
                }}
              >
                {hour && hour.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
