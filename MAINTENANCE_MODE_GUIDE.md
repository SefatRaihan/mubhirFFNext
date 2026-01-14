# How to Use Maintenance Mode

This guide explains how to enable and disable maintenance mode for your Mubhir application.

## Quick Start

### Enable Maintenance Mode

1. Open your `.env.local` file (or create it if it doesn't exist)
2. Add or update this line:
   ```env
   MAINTENANCE_MODE=true
   ```
3. Restart your application or redeploy

**That's it!** All visitors will now see the maintenance page.

### Disable Maintenance Mode

1. Open your `.env.local` file
2. Change the value to:
   ```env
   MAINTENANCE_MODE=false
   ```
3. Restart your application or redeploy

---

## Advanced Features

### IP Whitelisting (Optional)

If you want your team to access the site during maintenance while blocking everyone else:

1. Add this to your `.env.local`:
   ```env
   MAINTENANCE_MODE=true
   MAINTENANCE_WHITELIST_IPS=192.168.1.100,203.0.113.45
   ```

2. Replace the example IPs with your team's actual IP addresses (comma-separated)

**How to find your IP:**
- Visit https://whatismyipaddress.com/
- Copy the IPv4 address shown
- Add it to the whitelist

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MAINTENANCE_MODE` | Yes | `false` | Set to `true` to enable maintenance mode |
| `MAINTENANCE_WHITELIST_IPS` | No | Empty | Comma-separated list of IP addresses that can bypass maintenance mode |

---

## Examples

### Example 1: Basic Maintenance Mode
```env
# .env.local
MAINTENANCE_MODE=true
```

### Example 2: Maintenance with Team Access
```env
# .env.local
MAINTENANCE_MODE=true
MAINTENANCE_WHITELIST_IPS=192.168.1.100,203.0.113.45,10.0.0.5
```

### Example 3: Disabled (Normal Operation)
```env
# .env.local
MAINTENANCE_MODE=false
```

---

## Production Deployment

### Vercel / Netlify / Similar Platforms

1. Go to your project's environment variables settings
2. Add `MAINTENANCE_MODE` with value `true` or `false`
3. (Optional) Add `MAINTENANCE_WHITELIST_IPS` with your team's IPs
4. Redeploy or restart the application

### Traditional Hosting

1. Update your `.env` or `.env.production` file on the server
2. Restart your Node.js application:
   ```bash
   pm2 restart mubhir
   # or
   systemctl restart mubhir
   ```

---

## Troubleshooting

### Issue: Maintenance mode not activating

**Solution:**
- Ensure you've restarted the application after changing `.env.local`
- Check that the variable is exactly `MAINTENANCE_MODE=true` (case-sensitive)
- Verify the `.env.local` file is in the root directory

### Issue: Can't access site even though I'm whitelisted

**Solution:**
- Verify your IP address is correct (it may change if you're on a dynamic IP)
- Check for spaces in the IP list (should be comma-separated, no spaces)
- Make sure you're using your public IP, not local IP (192.168.x.x won't work in production)

### Issue: Redirect loop on maintenance page

**Solution:**
- This shouldn't happen with the current implementation
- If it does, check that `/maintenance` is not in any redirect rules in your hosting configuration

---

## Customizing the Maintenance Page

The maintenance page is located at:
```
app/maintenance/page.tsx
```

You can customize:
- **Messages**: Edit the Arabic and English text
- **Estimated time**: Update the "قريبًا جدًا" / "Very Soon" text
- **Colors**: Modify the gradient colors to match your brand
- **Social links**: Already configured with your Mubhir social media accounts
- **Animations**: Adjust Framer Motion animation timings

---

## Best Practices

1. **Test first**: Enable maintenance mode in development before production
2. **Communicate**: Announce maintenance windows to your users in advance
3. **Keep it short**: Try to minimize downtime
4. **Monitor**: Keep an eye on your social media for user questions during maintenance
5. **Whitelist wisely**: Only add trusted team member IPs to the whitelist

---

## Support

If you encounter any issues with maintenance mode, contact your development team or check the implementation files:
- `app/maintenance/page.tsx` - The maintenance page
- `middleware.ts` - The maintenance mode logic
