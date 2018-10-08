#target indesign

try {

  // set up doc
    var doc = app.documents.add();
    doc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
    doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
    doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;

  // get folders & files
    var scriptFile = File($.fileName);

    var projectFolder = scriptFile.parent;
    var inputFolder = Folder(projectFolder + "/input/");
    var outputFolder = Folder(projectFolder + "/output/");

    var listFile = File(inputFolder + "/articleList.txt");
    var outputFile = File(outputFolder + "/output.pdf");

  // read input file
    if (listFile.open("r")) {
      var listFileContents = listFile.read();
      listFile.close();
    } else {
      throw Error(inputFolder + "articleList.txt does not exist.");
    }

    var articleList = listFileContents.split("\n");


  // create magazine

    // inhaltsverzeichnis
    var toc = doc.textFrames.add({geometricBounds: [15, 15, 200, 150]});
    toc.contents = "Inhaltsverzeichnis\r" + articleList.join("\r");
    toc.parentStory.pointSize = 24;

    // artikel
    for (var i = 0; i < articleList.length; i++) {
      var p = doc.pages.add();
      var tf = p.textFrames.add({geometricBounds: [15, 15, 200, 150]});
      tf.contents = articleList[i];
      tf.parentStory.pointSize = 48;
    }

  // export & close
    doc.exportFile(ExportFormat.PDF_TYPE , outputFile, false);
    doc.close(SaveOptions.NO);

} catch (err) {

  alert("Error\r" + err.message);

}
