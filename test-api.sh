#!/bin/bash

BASE_URL="http://localhost:3000/api"

echo "1. Registering Organizer..."
ORG_REG=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Organizer One", "email": "org1@test.com", "password": "password123", "role": "organizer"}')
echo $ORG_REG
ORG_TOKEN=$(echo $ORG_REG | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo -e "\n2. Creating Event..."
EVENT_RESP=$(curl -s -X POST $BASE_URL/events \
  -H "Authorization: Bearer $ORG_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Tech Conference 2026", "description": "Annual tech conf", "date": "2026-05-20", "location": "Silicon Valley", "totalTickets": 100}')
echo $EVENT_RESP
EVENT_ID=$(echo $EVENT_RESP | grep -o '"_id":"[^"]*' | cut -d'"' -f4)

echo -e "\n3. Registering Customer..."
CUST_REG=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Customer One", "email": "cust1@test.com", "password": "password123", "role": "customer"}')
echo $CUST_REG
CUST_TOKEN=$(echo $CUST_REG | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo -e "\n4. Booking Tickets..."
BOOK_RESP=$(curl -s -X POST $BASE_URL/bookings \
  -H "Authorization: Bearer $CUST_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"eventId\": \"$EVENT_ID\", \"numTickets\": 2}")
echo $BOOK_RESP

echo -e "\n5. Updating Event (Triggering Notifications)..."
UPDATE_RESP=$(curl -s -X PUT $BASE_URL/events/$EVENT_ID \
  -H "Authorization: Bearer $ORG_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"location": "San Francisco"}')
echo $UPDATE_RESP

echo -e "\n6. Verifying Customer Bookings..."
curl -s -X GET $BASE_URL/bookings/me \
  -H "Authorization: Bearer $CUST_TOKEN"

echo -e "\nWaiting for background tasks to complete..."
sleep 5

