function doGet() {
  Logger.log('hello, world! hoge');
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheet = SpreadsheetApp.openById(scriptProperties.getProperty("SPREAD_SHEET_ID"));
  const sheet = spreadsheet.getSheetByName('シート1');
  const cell = sheet
    .getRange(1, 2, sheet.getLastRow())
    .getValues()
    .reduce((acc, value) => acc.concat(value), []);
  Logger.log(cell);

  const root = XmlService.createElement("root");
  const rules_system = XmlService.createElement("rules_system");

  for (const value of cell) {
    const child = XmlService.createElement("item")
      .setAttribute("name", value)
      .setAttribute("rule", 123);
    rules_system.addContent(child);
  }
  const document = XmlService.createDocument(root.addContent(rules_system));
  const xml = XmlService.getPrettyFormat().format(document);
  Logger.log(xml);
  const file = DriveApp.getFileById(scriptProperties.getProperty("XML_FILE_ID"));
  file.setContent(xml);
}
