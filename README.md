# cockpit-zyxel-NAS326-cpu-plugin

Cockpit Zyxel NAS326 CPU Plugin using [smoothie-charts](http://smoothiecharts.org)

## Introduction

The Cockpit Zyxel NAS326 CPU Plugin provides CPU fan speed and temperature
display and graph for the Zyxel NAS326 device running a custom Linux distro
with Cockpit admin panel installed.

I will update this section with links to more information about installing
a linux distro on the Zyxel NAS326 device.

## Installation

To install, as described in [Cockpit docs](https://cockpit-project.org/blog/creating-plugins-for-the-cockpit-user-interface.html) 
simply put the files in a subfolder like `NAS326-CPU` inside the folder `/usr/share/cockpit` for 
the plugin to be available for all system users **or** in a spesific user folder 
under `~/.local/share/cockpit`

**NOTE:** The user that is logged-in **must** be in the `i2c` group for this plugin to work.
*Or*, you can login as `root`, although that is not recommended.

For example, if you login as the `admin` user then you need to first make the 
`admin` user a part of the `i2c` group by executing the following command in
the terminal window:

```
# sudo usermod -aG i2c admin
```

## Screenshots:

Desktop Website display:

![PC_web_display](./screenshots/PC_web_display.png?raw=true)


Android Website Menu:

![Android_web_menu](./screenshots/Android_web_menu.jpg?raw=true)


Android Website Display:

![Android_web_display](./screenshots/Android_web_display.jpg?raw=true)


## Credits

Based on [Temperature plugin](https://github.com/MRsagi/cockpit-temperature-plugin) by MRsagi