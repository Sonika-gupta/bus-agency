## Layout

> APP

- App Bar

  - Search bar
  - Add Bus Button
  - User Details

- Container
  - Bus Cards (expandable)
    - Bus Number
    - Bus Name
    - Route
    - Source
    - Departure time
    - Time
    - Destination
    - Arrival time
    - price per seat
  - Action Panel [depending on user level]
    - Edit Button
    - Delete button

> Bus Details

- Seat Chart
- Pre filled Bus Form

> Bus Form

- Bus Number
- Bus Name
-

## Code Flow

Login Page
=> App loads
if (user.type === 'admin') {
access = 'all'
}
else access = 'book'
