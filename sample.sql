-- 🔍 Show all high severity events
SELECT * FROM security_events WHERE severity = 'high';

-- 📊 Total number of events per cloud provider
SELECT ca.provider, COUNT(se.id) AS total_events
FROM security_events se
JOIN cloud_accounts ca ON se.cloud_account_id = ca.id
GROUP BY ca.provider;

-- 👤 All events for user 'Alice'
SELECT u.name, ca.account_name, se.event_type, se.severity
FROM users u
JOIN cloud_accounts ca ON ca.user_id = u.id
JOIN security_events se ON se.cloud_account_id = ca.id
WHERE u.name = 'Alice';

-- ⏱️ 3 most recent events
SELECT * FROM security_events ORDER BY timestamp DESC LIMIT 3;

-- 🔁 Most common event types by provider
SELECT ca.provider, se.event_type, COUNT(*) AS event_count
FROM security_events se
JOIN cloud_accounts ca ON se.cloud_account_id = ca.id
GROUP BY ca.provider, se.event_type
ORDER BY ca.provider, event_count DESC;

-- 📉 Average number of events per user per account
SELECT u.name, COUNT(se.id) * 1.0 / COUNT(DISTINCT ca.id) AS avg_events_per_account
FROM users u
JOIN cloud_accounts ca ON ca.user_id = u.id
JOIN security_events se ON se.cloud_account_id = ca.id
GROUP BY u.id;

-- 🚫 Cloud accounts with no events
SELECT ca.account_name, ca.provider
FROM cloud_accounts ca
LEFT JOIN security_events se ON se.cloud_account_id = ca.id
WHERE se.id IS NULL;


INSERT INTO users (name, email) VALUES
  ('Charlie', 'charlie@example.com'),
  ('Dana', 'dana@example.com'),
  ('Eve', 'eve@example.com');

INSERT INTO cloud_accounts (provider, account_name, user_id) VALUES
  ('AWS', 'aws-charlie', 3),
  ('Azure', 'azure-dana', 4),
  ('GCP', 'gcp-eve', 5),
  ('AWS', 'aws-eve', 5),
  ('GCP', 'gcp-charlie', 3);


INSERT INTO security_events (cloud_account_id, event_type, severity) VALUES
  (1, 'login_attempt', 'high'),
  (1, 'login_attempt', 'medium'),
  (1, 'login_attempt', 'low'),
  (2, 'firewall_breach', 'high'),
  (2, 'firewall_breach', 'medium'),
  (3, 'malware_detected', 'medium'),
  (3, 'malware_detected', 'medium'),
  (4, 'config_change', 'low'),
  (4, 'config_change', 'low'),
  (5, 'port_scan', 'high'),
  (5, 'port_scan', 'high'),
  (6, 'unauthorized_access', 'high'),
  (6, 'unauthorized_access', 'medium'),
  (7, 'data_exfiltration', 'high'),
  (7, 'data_exfiltration', 'medium'),
  (8, 'login_attempt', 'low'),
  (8, 'firewall_breach', 'medium'),
  (9, 'port_scan', 'low'),
  (9, 'port_scan', 'low'),
  (9, 'port_scan', 'medium');
