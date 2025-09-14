# Deployment Guide - Monastery360

## Quick Deployment Options

### 1. Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the entire project folder
3. Your site will be live in minutes!

### 2. Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with zero configuration

### 3. GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch and deploy

### 4. Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Local Development Server

### Python
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Node.js
```bash
npx serve .
# Visit http://localhost:3000
```

### PHP
```bash
php -S localhost:8000
# Visit http://localhost:8000
```

## Testing Your Deployment

1. **Visit your deployed URL**
2. **Test PWA Installation**:
   - Look for install button in address bar
   - Try "Add to Home Screen" on mobile
3. **Test Offline Functionality**:
   - Disconnect internet
   - Refresh page - should still work
4. **Test All Features**:
   - Browse monasteries
   - Use search and filters
   - Try the interactive map
   - Test audio guides
   - Use the chatbot

## Production Checklist

- [ ] All files are accessible
- [ ] HTTPS is enabled
- [ ] PWA manifest is working
- [ ] Service worker is registered
- [ ] Icons are displaying correctly
- [ ] Audio guides are working
- [ ] Map is loading properly
- [ ] Search and filters work
- [ ] Chatbot responds correctly
- [ ] Mobile responsive design works
- [ ] Offline functionality works

## Performance Optimization

1. **Enable Gzip Compression**
2. **Set Cache Headers**
3. **Optimize Images** (convert SVG icons to PNG)
4. **Minify CSS/JS** (optional)
5. **Use CDN** for external resources

## Troubleshooting

### Common Issues

1. **PWA not installing**: Ensure HTTPS and valid manifest
2. **Audio not working**: Check browser permissions
3. **Map not loading**: Verify Leaflet CDN access
4. **Icons not showing**: Check icon file paths

### Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support  
- **Safari**: Full support (iOS 11.3+)
- **Edge**: Full support

## Support

For deployment issues:
1. Check browser console for errors
2. Verify all files are accessible
3. Test on different devices/browsers
4. Check network connectivity

---

**Happy Deploying!** 🚀