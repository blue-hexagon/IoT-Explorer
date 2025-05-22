import uuid
from django.core.management.base import BaseCommand
from django.utils import timezone
from device.models import Category, IotDevice, Program, ProgramInstance

class Command(BaseCommand):
    help = "Seed the database with categories, IoT devices, programs, and program instances."

    def handle(self, *args, **kwargs):
        self.stdout.write("🚀 Seeding data...")

        categories = [
            ("Patientovervågning", "PO", "Overvågning af vitale værdier i realtid", "ECG, SpO2, blodtryksmålere, telemetri"),
            ("Billeddiagnostik", "BD", "Medicinsk scanning og måling", "MRI, CT, røntgen, ultralyd"),
            ("Infusion og medicindosering", "IFMD", "Automatiseret medicinadministration", "IV-pumper, sprøjtepumper"),
            ("Livsstøttesystemer", "LSS", "Holder patienter i live", "Respiratorer, dialyse, kuvøser"),
            ("Miljøsensorer", "MS", "Bygnings-telemetri og klima", "Temperatur, fugtighed, lufttryk, tilstedeværelse"),
            ("Udstyrssporing & RTLS", "URTLS", "Lokationsbaserede tjenester", "RFID, BLE-tags på udstyr/patienter"),
            ("Bygningsautomation", "BA", "Styring af facilitetsinfrastruktur", "Klimaanlæg, elevatorer, belysning"),
            ("Adgangskontrol & sikkerhed", "AKS", "Fysisk og logisk adgangskontrol", "Smartlåse, biometriske scannere"),
            ("Kommunikation & underholdning", "KU", "Terminaler ved seng, kommunikation", "Nødopkald, IPTV, tablets"),
            ("Laboratorier & automatisering", "LAU", "Diagnostik og robotstyring", "Blodanalyseudstyr, apoteksrobotter"),
        ]

        category_map = {}
        for title, abbr, purpose, help_text in categories:
            cat, _ = Category.objects.get_or_create(
                abbreviation=abbr,
                defaults=dict(title=title, purpose=purpose, help_text=help_text)
            )
            category_map[abbr] = cat

        self.stdout.write("✅ Categories seeded")

        devices = [
            # (hostname, category_abbr)
            ("ecg-monitor-01", "PO"),
            ("sp02-tracker-01", "PO"),
            ("bp-cuff-01", "PO"),
            ("mri-scan-01", "BD"),
            ("ultrasound-01", "BD"),
            ("iv-pump-01", "IFMD"),
            ("syringe-pump-02", "IFMD"),
            ("ventilator-01", "LSS"),
            ("dialysis-unit-01", "LSS"),
            ("room-temp-sensor-101", "MS"),
            ("humidity-sensor-or3", "MS"),
            ("rfid-tracker-bed-08", "URTLS"),
            ("ble-tag-nurse-12", "URTLS"),
            ("hvac-controller-main", "BA"),
            ("lighting-system-floor1", "BA"),
            ("door-lock-ward3", "AKS"),
            ("biometric-reader-lab", "AKS"),
            ("bedside-terminal-145", "KU"),
            ("nurse-call-105", "KU"),
            ("blood-analyzer-01", "LAU"),
            ("pharma-robot-02", "LAU"),
        ]

        device_map = {}
        for hostname, abbr in devices:
            dev, _ = IotDevice.objects.get_or_create(
                hostname=hostname,
                defaults={"category": category_map[abbr]}
            )
            device_map[hostname] = dev

        self.stdout.write("✅ Devices seeded")

        programs = [
            ("Tjek af vitale tegn", "00:15:00", "Standardmåling af vitale værdier", "ecg-monitor-01"),
            ("24-timers EKG-overvågning", "24:00:00", "Kontinuerlig EKG-telemetri", "sp02-tracker-01"),
            ("MRI hjernescanning", "00:45:00", "MRI af hjernen", "mri-scan-01"),
            ("Ultralyd – Abdomen", "00:30:00", "Ultralyd abdomen", "ecg-monitor-01"),
            ("Saltvandsdrop", "01:00:00", "Infusion med saltvand", "sp02-tracker-01"),
            ("Insulinpumpe – Basisprogram", "08:00:00", "Standard insulin over 8 timer", "bp-cuff-01"),
            ("Ventilationscyklus", "12:00:00", "Ventilatorprogram", "ecg-monitor-01"),
            ("Dialyse-session", "04:00:00", "Dialysebehandling", "sp02-tracker-01"),
            ("Trykmåling i renrum", "00:05:00", "Logning af lufttryk", "ecg-monitor-01"),
            ("Infant RFID Tjek-ind", "00:01:00", "Sikkerhedsovervågning af spædbørn", "sp02-tracker-01"),
        ]

        program_map = {}
        for name, duration_str, desc, device_hostname in programs:
            prog, _ = Program.objects.get_or_create(
                name=name,
                iot_device=device_map[device_hostname],
                defaults=dict(
                    duration=duration_str,
                    description=desc
                )
            )
            program_map[name] = prog

        self.stdout.write("✅ Programs seeded")

        program_instances = [
            ("2025-03-08 12:05:56", "Tjek af vitale tegn"),
            ("2025-03-08 14:05:11", "Tjek af vitale tegn"),
            ("2025-03-09 14:05:04", "Tjek af vitale tegn"),
            ("2025-04-09 11:15:06", "24-timers EKG-overvågning"),
            ("2025-05-09 15:15:06", "MRI hjernescanning"),
            ("2025-05-29 21:08:11", "Ultralyd – Abdomen"),
            ("2025-06-19 12:02:41", "Saltvandsdrop"),
            ("2025-06-19 05:01:31", "Insulinpumpe – Basisprogram"),
            ("2025-06-19 08:33:32", "Ventilationscyklus"),
            ("2025-06-19 19:21:12", "Dialyse-session"),
            ("2025-07-19 21:48:32", "Trykmåling i renrum"),
            ("2025-08-19 15:38:34", "Infant RFID Tjek-ind"),
        ]

        for start, prog_name in program_instances:
            ProgramInstance.objects.get_or_create(
                start_time=start,
                program=program_map[prog_name]
            )

        self.stdout.write("✅ Program Instances seeded")
        self.stdout.write("🎉 All done!")
