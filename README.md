# Single page app using Next13 and Redux with server-side rendering

Features:

- React application using Next.js 13
- Redux is used for store management
- Ant Design front-end framework for styling
- Mobile-friendly responsive design
- Server-side code is used to retrieve a list of NHL players from NHL Records API
- User selects NHL Players using AutoComplete component
- AutoComplete can be configured to use either (i) client-side data, or (ii) server-side endpoint for search and validation
- Two views: one for creating an invoice, another for viewing invoices
- Invoice storage using CSV

![Main screen](https://github.com/IgorMalis/spa-next13-redux/blob/master/images/main.png?raw=true)

## Instructions

To run the development server, clone the repository and run the following commands:

```bash
npm install
num run dev
```

## Data retrieval

NHL player data is fetched from `https://records.nhl.com/site/api`, see [NHL API Docuemntation](https://gitlab.com/dword4/nhlapi/).

To fetch the list of players, a request is first made to the `/franchise` endpoint (retrieving a list of all teams), followed by `/player/byTeam` for each team, for a total of 40 GET requests.

There is a 200ms delay between each GET request to avoid throttling issues, so it takes 8 seconds to fetch all the data.

During development, you can set the `MAX_TEAMS` parameter to a small number (ie. 1 or 2) in `.env.local` to avoid retrieving all 39 teams.

## Players storage

Players are retrieved on the server-side when using the `/` route or API `/search` or `/validate` endpoints.

There are two options to make the players list available for the AutoComplete component:

- A list of all NHL Players can be passed to the client-side, allowing the AutoComplete component to work without performing server-side calls each time a user updates the Player field (use the `NEXT_PUBLIC_CACHE_CLIENT=yes` option in `.env.local`). This increases the size of the `/` route by approximately 34 kB, but speeds up the component after the page has loaded.
- To avoid passing the list to the client-side, use the `NEXT_PUBLIC_CACHE_CLIENT=no` option in `.env.local`. This reduces the size of the `/` route, but requires additional calls to the `/api/search` and `/api/validate` endpoints each time the AutoComplete component is used.

## AutoComplete

The Ant Design AutoComplete component is used to input the Player:

![AutoComplete component](https://github.com/IgorMalis/spa-next13-redux/blob/master/images/autocomplete.png?raw=true)

## Responsive design

The front-end is mobile-friendly:

![Mobile screen](https://github.com/IgorMalis/spa-next13-redux/blob/master/images/mobile.png?raw=true)

## Status indication

When the user successfully submits the invoice, they are shown an indication before being redirected:

![Submitting invoice](https://github.com/IgorMalis/spa-next13-redux/blob/master/images/submitting.png?raw=true)

After the POST is successful:

![Submitted invoice](https://github.com/IgorMalis/spa-next13-redux/blob/master/images/submitted.png?raw=true)

## Invoice view

The invoice view endpoint is available at: `/invoice/INVOICE_NUMBER`

![Invoice screen](https://github.com/IgorMalis/spa-next13-redux/blob/master/images/invoice.png?raw=true)

## Data storage

Invoices are stored in the `/data/data.csv` file, and the `csv` package is used to read/write from the CSV file.

It is stored in the following line format:

`INVOICE_NUMBER, FIRST_NAME, LAST_NAME, EMAIL, PLAYER, QUANTITY, SUBTOTAL, PLAYER, QUANTITY, SUBTOTAL, etc.`

The `StorageManager` class is used as an interface (allowing additional storage mechanisms to be added later, without impacting the rest of the application). The implementation logic for CSV files is in the `CsvStorage` class.
