export const LOG_LIST_MOCK_DATA = [
  {
    'timestamp': '2024-06-26T10:15:30Z',
    'status': 'created',
    'description': 'The order has been placed successfully.',
    'triggered_by': 'John Doe',
    'type': 'user'
  },
  {
    'timestamp': '2024-06-26T12:00:00Z',
    'status': 'in-transit',
    'description': 'The device is on its way to the warehouse.',
    'triggered_by': 'System',
    'type': 'system',
    'email_notification': {
      'email_type': 'in-transit-notification',
      'sent': true,
      'receipient': {
        'recipient_email': 'johndoe@example.com',
        'recipient_name': 'John Doe',
      }
    }
  },
  {
    'timestamp': '2024-06-27T08:30:00Z',
    'status': 'received',
    'description': 'The device has arrived at the warehouse.',
    'triggered_by': 'System',
    'type': 'system',
    'email_notification': {
      'email_type': 'device-received-notification',
      'sent': true,
      'receipient': {
        'recipient_email': 'johndoe@example.com',
        'recipient_name': 'John Doe',
      }
    }
  },
  {
    'timestamp': '2024-06-27T15:00:00Z',
    'status': 'evaluated',
    'description': 'The device has been assessed and found to be in acceptable condition.',
    'triggered_by': 'Jane Smith',
    'type': 'user',
    'email_notification': {
      'email_type': 'order-evaluated-notification',
      'sent': true,
      'receipient': {
        'recipient_email': 'johndoe@example.com',
        'recipient_name': 'John Doe',
      }
    }
  },
  {
    'timestamp': '2024-06-29T09:00:00Z',
    'status': 'completed',
    'description': 'The trade-in process is complete, and the payment has been processed.',
    'triggered_by': 'System',
    'type': 'system'
  },
]

export const NOTE_LIST_MOCK_DATA = [
  {
    '_id': '66833fa24d619e64d340af86',
    'note': 'This is note sample text string',
    'createdBy': {
      '_id': '66549861cd7e45df16e26198',
      'first_name': 'John Doe',
      'role': 'superadmin',
      'email': 'johndoe@example.com'
    },
    'createdAt': '2024-07-01T23:45:38.747Z'
  },
  {
    '_id': '66833fb74d619e64d340af87',
    'note': 'Second note with different content',
    'createdBy': {
      '_id': '66549861cd7e45df16e26199',
      'first_name': 'Jane Smith',
      'role': 'admin',
      'email': 'janesmith@example.com'
    },
    'createdAt': '2024-07-02T10:15:23.123Z'
  },
  {
    '_id': '66833fe14d619e64d340af90',
    'note': 'Customer service note on client request',
    'createdBy': {
      '_id': '66549861cd7e45df16e26202',
      'first_name': 'Carol White',
      'role': 'customer-service',
      'email': 'carolwhite@example.com'
    },
    'createdAt': '2024-07-02T13:45:12.654Z'
  },
  {
    '_id': '66833fc84d619e64d340af88',
    'note': 'Warehouse note regarding device check',
    'createdBy': {
      '_id': '66549861cd7e45df16e26200',
      'first_name': 'Alice Brown',
      'role': 'warehouse',
      'email': 'alicebrown@example.com'
    },
    'createdAt': '2024-07-02T11:20:45.567Z'
  },
]
