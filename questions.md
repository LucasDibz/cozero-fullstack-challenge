- How would you make sure the emails provided from the users are real?

  - Use a two factor step. Send an email with verification which will verify that the user has access to the email provided.

- After running the app for a while, we suddenly get a huge influx of new projects. We currently have over 5.000.000 projects in our database. The response time of the /projects endpoint went from 50ms to 3s. Assuming the frontend is fetching data per language and within specific timeframe (from - to date), what would you do in order to make the app faster? E.g. request from the frontend -> GET /projects?language=${lang}&createdAtGreaterThan=${date}&createdAtLowerThan=${date}

  - Add pagination and limit to the query, e.g: 100 results/page
  - Alternative: Stream the data from backend to frontend.

- What else can we do in order to improve the time?

  - Cache the results for a determinate amount of time. So all requests get the same data when fetched in that interval.

- What kind of metrics would you collect from your application to know that everything is OK?
  - Page Loading time (Web Vitals)
  - API response time
  - healthcheck uptime
  - Crash logs
  - Unit/e2e test results
