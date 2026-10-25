# SuperSamba Scorekeeper

A scorekeeper for SuperSamba, the Samba card game played with a Super Samba (4 through ace), wild canastas and 7s canastas.

**Open it:** https://0x54c3.github.io/SuperSamba_Scorekeeper/

## Use it on Apple devices

The app runs in Safari and can be installed like a regular app. Installing it is what makes it work offline, so do this rather than bookmarking the link.

### iPad or iPhone

1. Open https://0x54c3.github.io/SuperSamba_Scorekeeper/ in **Safari**. Other browsers on iOS cannot install it properly.
2. Tap the **Share** button (the square with an arrow). On iPad it is at the top right of the address bar, on iPhone at the bottom of the screen.
3. Scroll down the share sheet and tap **Add to Home Screen**, then **Add**.
4. Open the app once from the new **SuperSamba** icon while still online. From then on it works with no internet and opens full screen without Safari's address bar.

### Mac

1. Open the link in **Safari** (macOS Sonoma or later).
2. Choose **File → Add to Dock**, then click **Add**.
3. Open it once from the Dock while online. It then runs as its own window and works offline.

### Keep in mind

- Scores are saved on that device only, not on GitHub and not shared between devices. Each iPad, iPhone or Mac keeps its own games.
- Use **Games → Back up open game** now and then and keep the file somewhere safe. **Games → Restore from backup** loads it again, on the same device or a different one.
- Removing the icon from the home screen or Dock deletes the saved games with it. Back up first.
- Updates are automatic. Whenever the app is opened with internet, it loads the newest version from GitHub and saves it for offline use.

## What's here

| File | What it is |
| --- | --- |
| `index.html` | The whole app |
| `sw.js` | Saves the app on the device so it works offline |
| `manifest.webmanifest` | Name and icon for the home screen |
| `icon-*.png` | App icons |

## Updating

Upload new versions of these files over the old ones. Devices pick up the new version the next time the app is opened online.
