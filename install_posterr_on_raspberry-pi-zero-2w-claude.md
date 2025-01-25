# Raspberry Pi Zero 2W Posterr Project Setup Guide

## Prerequisites

### Hardware
- Raspberry Pi Zero 2W
- MicroSD Card (8GB+ recommended)
- Power Supply
- Network Connection

### Software Downloads
- [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
- [Raspbian Buster Lite (2021-05-07)](https://support.pishop.us/article/137-official-links-to-raspberry-pi-os-buster)

## Step 1: Prepare Raspberry Pi OS

### Download OS
Download `2021-05-07-raspios-buster-armhf-lite-firstboot.zip`

### Flash MicroSD Card
1. Open Raspberry Pi Imager
2. Select downloaded OS image
3. Choose target MicroSD card
4. Configure settings:
   - Set username/password
   - Enable SSH
   - Configure WiFi credentials

## Step 2: Initial Setup

### SSH into Raspberry Pi
```bash
# Update and upgrade system packages
sudo apt update
sudo apt upgrade -y
```

## Step 3: Install Docker and Docker Compose

### Docker Installation Script
```bash
#!/bin/bash
# docker_install.sh

# Remove old docker installations
sudo apt-get remove docker docker-engine docker.io containerd runc

# Install dependencies
sudo apt-get update
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up stable repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Install Docker Compose
sudo apt-get install -y docker-compose

# Add user to docker group
sudo usermod -aG docker $USER

# Enable Docker to start on boot
sudo systemctl enable docker
sudo systemctl start docker

echo "Docker and Docker Compose installed successfully!"
```

### Run Installation Script
```bash
chmod +x docker_install.sh
./docker_install.sh
```

## Step 4: Posterr Project Setup

### Clone Project
```bash
# Create docker directory
mkdir -p /home/pi/docker
cd /home/pi/docker

# Clone Posterr repository
git clone https://github.com/petersem/posterr.git
cd posterr

# Create required directories
mkdir config custom
```

### Modify docker-compose.yml
Update timezone and volume mounts:
```yaml
version: '3'
services:
  posterr:
    # ... other configurations
    environment:
      - TZ=America/Chicago
    volumes:
      - ./config:/config
      - ./custom:/custom
    restart: unless-stopped
```

### Deploy Posterr
```bash
docker compose up -d --build
```

## Step 5: Kiosk Mode Configuration

### Install Chromium Kiosk Script
```bash
#!/bin/bash
# kiosk_setup.sh

# Install X11 and Chromium
sudo apt-get update
sudo apt-get install -y x11-xserver-utils unclutter chromium-browser

# Create autostart script
mkdir -p ~/.config/autostart
cat > ~/.config/autostart/kiosk.desktop << EOL
[Desktop Entry]
Type=Application
Name=Kiosk
Exec=/home/pi/kiosk.sh
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
EOL

# Create kiosk launch script
cat > ~/kiosk.sh << EOL
#!/bin/bash
xset -dpms
xset s off
xset s noblank

unclutter &

chromium-browser \
    --disable-infobars \
    --no-first-run \
    --ozone-platform=wayland \
    --start-maximized \
    --kiosk \
    --disk-cache-dir=/dev/null \
    "http://127.0.0.1:9876" &
EOL

# Make scripts executable
chmod +x ~/kiosk.sh
```

### Screen Rotation
Edit `/boot/config.txt` and add:
```
display_rotate=1  # Rotate 90 degrees
```

## Troubleshooting
- Ensure Plex API token is correctly configured
- Check network connectivity
- Verify Docker and Compose versions compatibility

## Resources
- [Posterr GitHub](https://github.com/petersem/posterr)
- [Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/)

## Disclaimer
Steps tested on Raspbian Buster Lite (2021-05-07)
