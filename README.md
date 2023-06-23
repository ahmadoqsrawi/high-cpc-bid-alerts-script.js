#  Google Ads High CPC Bid Alerts Script
## License
This script is licensed under the MIT License.
Copyright (c) 2023 Ahmad Ismail

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# The Script

## Google Ads High CPC Bid Alerts Script
**This script fetches keyword statistics for the last 7 days and creates a report in a Google Sheets spreadsheet. It also sends an email alert if any keyword's average cost-per-click (CPC) exceeds a specified threshold.**

### Prerequisites
**Before using this script, you need to set up the following:**

- You must have an active Google Ads account with access to the campaigns and keywords you want to monitor.
- Provide a valid email address in the **recipientEmail** variable. This is where you'll receive email notifications when any keyword's average cost-per-click (CPC) exceeds a specified threshold.

### Usage
1. Access your Google Ads account and navigate to the "Tools & Settings" section.
2. Click on "Scripts" to open the Google Ads Scripts interface.
3. Click on the plus icon or the "New script" button to create a new script.
4. Give your script a name, such as High CPC Bid Alerts Script.
5. Set the CPC threshold: Adjust the value of the **cpcThreshold** variable to the desired CPC threshold.
6. Set the recipient email address: Replace **your-email@example.com** with the desired email address where you want to receive the alerts.
7. Save the script and run.
8. Set the frequency to "Hourly" to receive the report every hour. Adjust the frequency as desired for your reporting needs.
9. Save the trigger settings, and the script will run automatically according to the defined frequency.
10. Check the specified recipientEmail inbox for email notifications whenever any keyword's average cost-per-click (CPC) exceeds a specified threshold.