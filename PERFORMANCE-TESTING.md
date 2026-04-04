autocannon -c 500 -d 10 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5ZGYzZWJlLWM5MDgtNDlmYi04Mzk4LTRhMmJlZjk2NjI2MyIsInJvbGUiOiJWSUVXRVIiLCJpYXQiOjE3NzUyNTI3MzYsImV4cCI6MTc3NTMzOTEzNn0.jXygPVYHXS-6Byt2Iezp5RCI2Y4Jg0mDc2yzx0NIXhM" \
http://localhost:3000/api/dashboard/summary

EndPoint Tested :  GET /api/dashboard/summary
Authorization: Bearer JWT

Tool Used: Autocannon

Observations:

Low concurrency (20–100 users):
- Latency is low (<50 ms)
- Requests/sec scales well
- No errors or timeouts

---

Medium concurrency (200 users):
- Latency increases (87 ms average)
- RPS remains stable (2.2k req/sec)
- No errors

---

High concurrency (500 users):
- Significant latency increase (123–157 ms average, max >9s)
- Some requests timeout (152–209 errors)
- RPS does not scale beyond 2k req/sec

Conclusion:

The backend handles 100–200 concurrent users efficiently.
Performance bottleneck appears to be the database due to 
- connection pool limit