/*************************************************
* Google Ads Budget Report Script
* @version: 2.0
* @author: Ahmad Ismail
***************************************************
*/

// Set the CPC threshold for the alert
var cpcThreshold = 10.0; // Modify this value as needed

// Set the recipient email address
var recipientEmail = "your-email@example.com"; // Replace with the desired email address

// Main function
function main() {
  var spreadsheet = SpreadsheetApp.create("CPC Bid Alert Report");
  var sheet = spreadsheet.getActiveSheet();

  // Get the current date and time
  var now = new Date();
  sheet.appendRow(["Date", "Campaign", "Ad Group", "Keyword", "CPC"]);

  // Fetch all keywords with their statistics
  var keywordStats = AdsApp.keywords()
    .forDateRange("LAST_7_DAYS")
    .withCondition("Status = ENABLED")
    .withCondition("Impressions > 0")
    .withCondition("AverageCpc > " + cpcThreshold)
    .orderBy("AverageCpc DESC")
    .get();

  // Fetch campaign and ad group data in batches for improved performance
  var keywordIds = [];
  while (keywordStats.hasNext()) {
    keywordIds.push(keywordStats.next().getId());
  }

  var batchKeywords = AdsApp.keywords().withIds(keywordIds);
  var batchKeywordIterator = batchKeywords.withLimit(500).get();
  var adGroupIds = [];
  var campaignIds = [];

  while (batchKeywordIterator.hasNext()) {
    var keyword = batchKeywordIterator.next();
    adGroupIds.push(keyword.getAdGroup().getId());
    campaignIds.push(keyword.getCampaign().getId());
  }

  var batchAdGroups = AdsApp.adGroups().withIds(adGroupIds);
  var batchCampaigns = AdsApp.campaigns().withIds(campaignIds);

  // Create a mapping of ad group and campaign names for faster lookup
  var adGroupMap = {};
  var adGroupsIterator = batchAdGroups.get();
  while (adGroupsIterator.hasNext()) {
    var adGroup = adGroupsIterator.next();
    adGroupMap[adGroup.getId()] = adGroup.getName();
  }

  var campaignMap = {};
  var campaignsIterator = batchCampaigns.get();
  while (campaignsIterator.hasNext()) {
    var campaign = campaignsIterator.next();
    campaignMap[campaign.getId()] = campaign.getName();
  }

  // Iterate over keyword statistics and generate the report
  while (keywordStats.hasNext()) {
    var keyword = keywordStats.next();
    var adGroup = adGroupMap[keyword.getAdGroup().getId()];
    var campaign = campaignMap[keyword.getCampaign().getId()];
    var cpc = keyword.getStats().getAverageCpc();

    sheet.appendRow([
      now,
      campaign,
      adGroup,
      keyword.getText(),
      cpc
    ]);
  }

  // Set the highest CPC amount as an alert in the email
  var highestCpc = keywordStats.hasNext() ? keywordStats.next().getStats().getAverageCpc() : 0;

  var subject = "High CPC Alert";
  var message = "CPC exceeds threshold: " + highestCpc;

  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    body: message
  });
}