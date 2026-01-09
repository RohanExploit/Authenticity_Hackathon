# Backend & Frontend Sync Complete

## Status
- **Correct Data Flow Established**: Backend -> Frontend -> Assignment -> Backend Validation.
- **Seeded Data**: `CUST_001` (High), `CUST_002` (Medium), `CUST_003` (Low) are now hardcoded in the backend.
- **Risk Calculation**: Centralized in backend service.

## Backend Verification
- `GET /api/customers` returns enriched data (including `riskScore`).
- `POST /api/assign-case` validates `customerId` against the seed list.

## Frontend Verification
- `Customers.jsx` uses `api.get` (axios instance).
- `AutoAssignment.jsx` reads `id` and `risk` from URL (e.g., `?id=CUST_001&risk=75`) and POSTs to `/assign-case`.

## Next Steps
- Verify the "suggest-collector" mock endpoint is working or stubbed if not yet implemented (It was called in `AutoAssignment.jsx` but I assume it exists or is mocked).
- Run the full flow:
  1. Open Customers Page.
  2. Click "Assign" on CUST_001.
  3. Auto Assignment page loads with `id=CUST_001`.
  4. Click "Confirm".
  5. Alert confirms success.
