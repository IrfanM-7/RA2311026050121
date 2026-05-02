# Stage 1

Basic headers used for all requests

Headers:
{
  "Content-Type": "application/json",
  "userId": "string"
}

---

## 1. Get Notifications

GET /notifications

Request:

Headers:
{
  "userId": "123"
}

Response:

{
  "data": [
    {
      "id": "n1",
      "title": "Placement",
      "message": "Company hiring",
      "isRead": false,
      "createdAt": "time"
    }
  ]
}

---

## 2. Create Notification

POST /notifications

Request:

Headers:
{
  "userId": "123"
}

Body:
{
  "title": "Event",
  "message": "Hackathon"
}

Response:
{
  "success": true
}

---

## 3. Mark Notification as Read

PUT /notifications/:id

Request:

Headers:
{
  "userId": "123"
}

Response:
{
  "success": true
}

---

## 4. Get Unread Count

GET /notifications/unread

Request:

Headers:
{
  "userId": "123"
}

Response:
{
  "count": 3
}

---

## 5. Real-Time Notifications

GET /notifications/stream

Request:

Headers:
{
  "userId": "123"
}

This is for real time updates.

Uses WebSocket or SSE.

Whenever a new notification comes, it is sent directly to user, no need to refresh.

# Stage 2

For storing notifications, I will use PostgreSQL.

Reason:
- structured data
- easy to query
- good for filtering unread notifications
- reliable

---

## Table: notifications

Fields:

id (primary key)
userId (string)
title (string)
message (string)
isRead (boolean)
createdAt (timestamp)

---

## Problems when data increases

- too many rows (millions of notifications)
- slow queries for unread notifications
- sorting by createdAt becomes slow

---

## Solutions

- add index on userId and isRead
- add index on createdAt
- use pagination (limit results)
- archive old notifications
- use caching if needed

---

## Sample Queries

Get notifications:

SELECT * FROM notifications
WHERE userId = '123'
ORDER BY createdAt DESC
LIMIT 10;

---

Get unread count:

SELECT COUNT(*) FROM notifications
WHERE userId = '123' AND isRead = false;

---

Mark as read:

UPDATE notifications
SET isRead = true
WHERE id = 'n1';

---

Insert notification:

INSERT INTO notifications (id, userId, title, message, isRead, createdAt)
VALUES ('n1', '123', 'Event', 'Hackathon', false, NOW());