# Setting up Raspberry Pi Zero 2W for Posterr Project

This guide will walk you through the steps to set up your Raspberry Pi Zero 2W running Raspberry Pi OS Buster, and get the [Posterr project](https://github.com/petersem/posterr) up and running in a Docker container. It also includes instructions to boot Chromium in kiosk mode and configure the Pi for portrait display.

## Prerequisites

1. Raspberry Pi Zero 2W
2. MicroSD card (at least 8GB)
3. Another computer for flashing the Raspberry Pi OS
4. Internet connection (for Pi and computer)

## Step 1: Download Raspberry Pi OS Buster

First, download an older version of Raspberry Pi OS (Buster) since newer versions of Chromium might not run well on devices with less than 1GB of RAM. You can download the image from one of these sources:

- [Raspberry Pi OS Buster from PiShop](https://support.pishop.us/article/137-official-links-to-raspberry-pi-os-buster)
- [Raspberry Pi OS Buster from GitHub](https://github.com/meeDamian/raspios/releases)

### Recommended Image:
- `2021-05-07-raspios-buster-armhf-lite-firstboot.zip`

## Step 2: Flash the OS onto the SD Card

1. Download and install the [Raspberry Pi Imager](https://www.raspberrypi.com/software/).
2. Flash the `2021-05-07-raspios-buster-armhf-lite-firstboot.zip` image onto your microSD card.
3. During the flash process, configure your Raspberry Pi:
    - Set up your Wi-Fi credentials
    - Enable SSH
    - Set a username and password

## Step 3: SSH into the Raspberry Pi

Once the OS is flashed and the Pi is booted, SSH into your Raspberry Pi from your terminal:

```bash
ssh pi@<IP_ADDRESS>
```

## Step 4: Update and Upgrade Raspberry Pi OS

Before installing Docker and Docker Compose, it's a good idea to update and upgrade your system:

```bash
sudo apt update
sudo apt upgrade -y
```

## Step 5: Install Docker and Docker Compose

Create a script to install Docker and Docker Compose. Note that in this version of Raspbian Buster, the correct Docker Compose command is `docker compose` (without the hyphen). Here's a simple script to do the job:

```bash
# Install Docker
curl -sSL https://get.docker.com | sh

# Add pi user to the Docker group
sudo usermod -aG docker pi

# Install Docker Compose (v2)
sudo apt-get install -y libffi-dev python3-dev python3-pip
sudo pip3 install docker-compose

# Verify installations
docker --version
docker compose version
```

Run this script to install Docker and Docker Compose.

## Step 6: Clone the Posterr Project

Create a `docker` directory and clone the Posterr repository:

```bash
mkdir -p /home/pi/docker
cd /home/pi/docker
git clone https://github.com/petersem/posterr.git
```

This will create the following directory structure:

```bash
/home/pi/docker/posterr
```

## Step 7: Create Required Directories

Inside the `posterr` directory, create two additional directories:

```bash
mkdir /home/pi/docker/posterr/config
mkdir /home/pi/docker/posterr/custom
```

## Step 8: Modify `docker-compose.yml`

Edit the `docker-compose.yml` file to customize it for your setup:

1. Change the timezone to `America/Chicago`
2. Update volume mounts for the `config` and `custom` directories.
3. Add `restart: unless-stopped` to ensure Posterr persists through reboots.

Here’s the modified `docker-compose.yml` example:

```yaml
version: '3'
services:
  posterr:
    image: petersem/posterr:latest
    container_name: posterr
    ports:
      - "9876:9876"
    volumes:
      - ./config:/config
      - ./custom:/custom
    environment:
      - TZ=America/Chicago
    restart: unless-stopped
```

## Step 9: Start Posterr in Docker

Now, run the following command from the `posterr` directory to build and start the Docker container:

```bash
cd /home/pi/docker/posterr
docker compose up -d --build
```

Once it's running, visit `http://<PI_IP_ADDRESS>:9876` in a web browser to complete the initial configuration. You'll need to get your API token from Plex and other configuration details as outlined on the Posterr GitHub page.

## Step 10: Set Up Chromium in Kiosk Mode

To have your Raspberry Pi boot into Chromium in kiosk mode, follow the instructions from [Undr's blog post](http://www.undr.com/understatement/2024/free_kiosk_dashboard_setup_for_raspi/index.html), but modify the last command like so:

```bash
--disk-cache-dir=/dev/null "http://127.0.0.1:9876" &
```

### Add the following to your `.bashrc` file:

```bash
@reboot chromium-browser --noerrdialogs --kiosk http://127.0.0.1:9876 --disk-cache-dir=/dev/null
```

This will ensure that Chromium launches in full-screen mode and loads your Posterr dashboard automatically after each reboot.

## Step 11: Rotate the Screen to Portrait Mode

To rotate the screen to portrait mode, you'll need to edit the `/boot/config.txt` file.

```bash
sudo nano /boot/config.txt
```

Add the following line at the end of the file:

```bash
display_rotate=1
```

This will rotate the display 90 degrees. Save the file and reboot your Raspberry Pi:

```bash
sudo reboot
```

Now your Raspberry Pi will boot into portrait mode, and Chromium will load the Posterr dashboard.

---

## Troubleshooting

- If Docker Compose isn't working correctly, ensure that you are using `docker compose` (without the hyphen).
- If the screen rotation doesn't work, double-check the `/boot/config.txt` file for typos.

---

## Conclusion

You now have a fully set up Raspberry Pi Zero 2W running the Posterr project in Docker, with Chromium in kiosk mode, displaying your dashboard in portrait mode. This setup provides a great, low-cost solution for hosting a media dashboard!

Feel free to reach out if you have any questions or run into any issues. Enjoy your new setup!
