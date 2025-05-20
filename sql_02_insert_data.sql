/* IOT Explorer DB Schema Model Population Script */
SET client_encoding = 'UTF8';
-- INSERT INTO active_program(iot_device, start_time, program) VALUES
-- ( ),
-- ( );

INSERT INTO category (title, purpose, help_text) VALUES
('Patientovervågning', 'Overvågning af vitale værdier i realtid', 'ECG, SpO2, blodtryksmålere, telemetri'),
('Billeddiagnostik', 'Medicinsk scanning og måling', 'MRI, CT, røntgen, ultralyd'),
('Infusion og medicindosering', 'Automatiseret medicinadministration', 'IV-pumper, sprøjtepumper'),
('Livsstøttesystemer', 'Holder patienter i live', 'Respiratorer, dialyse, kuvøser'),
('Miljøsensorer', 'Bygnings-telemetri og klima', 'Temperatur, fugtighed, lufttryk, tilstedeværelse'),
('Udstyrssporing & RTLS', 'Lokationsbaserede tjenester', 'RFID, BLE-tags på udstyr/patienter'),
('Bygningsautomation', 'Styring af facilitetsinfrastruktur', 'Klimaanlæg, elevatorer, belysning'),
('Adgangskontrol & sikkerhed', 'Fysisk og logisk adgangskontrol', 'Smartlåse, biometriske scannere'),
('Kommunikation & underholdning', 'Terminaler ved seng, kommunikation', 'Nødopkald, IPTV, tablets'),
('Laboratorier & automatisering', 'Diagnostik og robotstyring', 'Blodanalyseudstyr, apoteksrobotter');

INSERT INTO iot_device (id, hostname, category_id) VALUES
-- Patientovervågning (1)
(gen_random_uuid(), 'ecg-monitor-01', 1),
(gen_random_uuid(), 'sp02-tracker-01', 1),
(gen_random_uuid(), 'bp-cuff-01', 1),

-- Billeddiagnostik (2)
(gen_random_uuid(), 'mri-scan-01', 2),
(gen_random_uuid(), 'ultrasound-01', 2),

-- Infusion og medicindosering (3)
(gen_random_uuid(), 'iv-pump-01', 3),
(gen_random_uuid(), 'syringe-pump-02', 3),

-- Livsstøttesystemer (4)
(gen_random_uuid(), 'ventilator-01', 4),
(gen_random_uuid(), 'dialysis-unit-01', 4),

-- Miljøsensorer (5)
(gen_random_uuid(), 'room-temp-sensor-101', 5),
(gen_random_uuid(), 'humidity-sensor-or3', 5),

-- Udstyrssporing & RTLS (6)
(gen_random_uuid(), 'rfid-tracker-bed-08', 6),
(gen_random_uuid(), 'ble-tag-nurse-12', 6),

-- Bygningsautomation (7)
(gen_random_uuid(), 'hvac-controller-main', 7),
(gen_random_uuid(), 'lighting-system-floor1', 7),

-- Adgangskontrol & sikkerhed (8)
(gen_random_uuid(), 'door-lock-ward3', 8),
(gen_random_uuid(), 'biometric-reader-lab', 8),

-- Kommunikation & underholdning (9)
(gen_random_uuid(), 'bedside-terminal-145', 9),
(gen_random_uuid(), 'nurse-call-105', 9),

-- Laboratorier & automatisering (10)
(gen_random_uuid(), 'blood-analyzer-01', 10),
(gen_random_uuid(), 'pharma-robot-02', 10);


INSERT INTO program (name, duration, description, category_id) VALUES
('Tjek af vitale tegn', '00:15:00', 'Standardmåling af vitale værdier: blodtryk, puls, iltmætning',1),
('24-timers EKG-overvågning', '24:00:00', 'Kontinuerlig EKG-telemetri til vurdering af hjertefunktion',1),
('MRI hjernescanning', '00:45:00', 'Standard MRI-scanning af hjernen',2),
('Ultralyd – Abdomen', '00:30:00', 'Ikke-invasiv ultralyd til abdominal diagnostik',2),
('Saltvandsdrop', '01:00:00', 'Infusion af saltvandsopløsning med 100ml/time',3),
('Insulinpumpe – Basisprogram', '08:00:00', 'Standard insulinlevering over 8 timer',3),
('Ventilationscyklus', '12:00:00', 'Foruddefineret ventilatorprogram til intensivpatienter',4),
('Dialyse-session', '04:00:00', 'Hæmodialyseforløb for nyrepatienter',4),
('Trykmåling i renrum', '00:05:00', 'Måling og logning af positivt lufttryk i renrum',5),
('Infant RFID Tjek-ind', '00:01:00', 'RTLS-signal til sikkerhedsovervågning af spædbørn',5);

