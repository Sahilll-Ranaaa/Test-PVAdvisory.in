import { jsPDF } from "jspdf";
import { reportContentMatrix, maturityLevels } from "./report-content-matrix";

export const generateReport = async (data, shouldDownload = true) => {
  const { name, email, company_name, score, dimensionScores, answers, surveyType } = data;
  
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const dimensions = Object.keys(dimensionScores);
  
  // Bands per dimension
  const dimensionData = dimensions.map(dim => {
    const s = Math.round(dimensionScores[dim]);
    let band = "Critical";
    let color = [192, 57, 43]; // Coral #C0392B
    if (s >= 20) { band = "Strong"; color = [39, 174, 96]; } // Green #27AE60
    else if (s >= 14) { band = "Good"; color = [26, 158, 143]; } // Teal #1A9E8F
    else if (s >= 8) { band = "Needs Work"; color = [196, 122, 0]; } // Amber #C47A00
    
    return { name: dim, score: s, band, color };
  });

  // Ranking for roadmap and priorities (Tie-break by dimension order)
  const rankedDimensions = [...dimensionData].sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return dimensions.indexOf(a.name) - dimensions.indexOf(b.name);
  });

  const bottom3 = rankedDimensions.slice(0, 3);
  const strongDims = dimensionData.filter(d => d.band === "Strong");
  const gapDims = rankedDimensions.filter(d => d.band !== "Strong");

  // Maturity Level
  let levelNum = 1;
  if (score >= 121) levelNum = 5;
  else if (score >= 91) levelNum = 4;
  else if (score >= 61) levelNum = 3;
  else if (score >= 31) levelNum = 2;
  const level = maturityLevels[levelNum];

  const colors = {
    maroon: [159, 2, 2],
    darkGrey: [55, 65, 81], // Slate Grey (was 31, 41, 55 which looked blue)
    lightGrey: [240, 240, 240],
    textMain: [17, 24, 39],
    textSecondary: [75, 85, 99],
    white: [255, 255, 255],
    greyPanel: [245, 245, 245]
  };

  const addHeader = (doc, title) => {
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 210, 30, "F");
    
    const logoUrl = "/pv-logo.png";
    try {
        doc.addImage(logoUrl, 'PNG', 10, 5, 25.2, 19.2);
    } catch(e){}

    doc.setTextColor(colors.darkGrey[0], colors.darkGrey[1], colors.darkGrey[2]);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(title.toUpperCase(), 200, 18, { align: "right" });
    doc.setDrawColor(220, 220, 220);
    doc.line(10, 30, 200, 30);
  };

  const addFooter = (doc, pageNumber) => {
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    doc.text(`PV Advisory | CFO Health Score™ | Page ${pageNumber}`, 105, 285, { align: "center" });
  };

  // --- PAGE 1: COVER PAGE ---
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, "F");

  // Logo
  try {
    const logoUrl = "/pv-logo.png";
    doc.addImage(logoUrl, 'PNG', 15, 10, 25.2, 19.2);
  } catch(e){}

  // Grey Title Block
  doc.setFillColor(colors.darkGrey[0], colors.darkGrey[1], colors.darkGrey[2]); 
  doc.rect(15, 45, 180, 65, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(30);
  doc.setFont("helvetica", "bold");
  doc.text(surveyType.toUpperCase(), 22, 68);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(220, 220, 220);
  
  doc.text("Prepared for:", 22, 80);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(name, 48, 80);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(220, 220, 220);
  doc.text(`Company: ${company_name || "N/A"} | ${email}`, 22, 86);
  
  const today = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  doc.text(`Date: ${today}`, 22, 92);
  
  doc.text("Prepared by:", 22, 98);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("PV Advisory Team", 48, 98);

  // Score Highlight
  doc.setFillColor(250, 250, 250);
  doc.rect(15, 125, 95, 60, "F");

  doc.setTextColor(colors.maroon[0], colors.maroon[1], colors.maroon[2]);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Overall Score", 22, 135);

  doc.setFontSize(60);
  doc.setFont("helvetica", "bold");
  doc.text(`${Math.round(score)}`, 22, 163);
  
  doc.setFontSize(22);
  doc.setFont("helvetica", "normal");
  doc.text("/ 150", 65, 163);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text(`Level ${levelNum} — ${level.name}`, 22, 175);
  
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "italic");
  const splitDesc = doc.splitTextToSize(level.coverText, 85);
  doc.text(splitDesc, 22, 182);

  // Dimension scores sidebar on cover
  doc.setFillColor(255, 252, 245);
  doc.rect(110, 125, 85, 60, "F");
  doc.setTextColor(colors.darkGrey[0], colors.darkGrey[1], colors.darkGrey[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Dimension Scores", 115, 135);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  let coverY = 143;
  dimensionData.forEach(dim => {
    doc.setTextColor(100, 100, 100);
    doc.text(dim.name, 115, coverY);
    doc.setTextColor(colors.maroon[0], colors.maroon[1], colors.maroon[2]);
    doc.setFont("helvetica", "bold");
    doc.text(`${dim.score}/25`, 185, coverY, { align: "right" });
    coverY += 7;
  });

  addFooter(doc, 1);

  // --- PAGE 2: DASHBOARD & STRENGTHS ---
  doc.addPage();
  addHeader(doc, "Performance Dashboard");
  
  doc.setFontSize(22);
  doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
  doc.text("Performance Dashboard", 20, 42);

  doc.setFontSize(9.5);
  doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
  const dashIntro = `This assessment evaluates the maturity of your finance function across six critical dimensions. Your total score of ${Math.round(score)}/150 places you at the '${level.name}' level. Below is the breakdown of your performance across each area.`;
  doc.text(doc.splitTextToSize(dashIntro, 170), 20, 49);

  // Dashboard Table
  let tableY = 62;
  doc.setFillColor(colors.darkGrey[0], colors.darkGrey[1], colors.darkGrey[2]);
  doc.rect(20, tableY, 170, 9, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("DIMENSION", 26, tableY + 6);
  doc.text("SCORE", 130, tableY + 6);
  doc.text("BAND", 160, tableY + 6);

  tableY += 9;
  dimensionData.forEach((dim, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(252, 252, 252);
      doc.rect(20, tableY, 170, 10, "F");
    }
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(dim.name, 26, tableY + 6.5);
    doc.setFont("helvetica", "bold");
    doc.text(`${dim.score}/25`, 130, tableY + 6.5);
    
    // Band Badge
    doc.setFillColor(dim.color[0], dim.color[1], dim.color[2]);
    doc.rect(158, tableY + 2.5, 28, 5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text(dim.band.toUpperCase(), 172, tableY + 6, { align: "center" });
    
    tableY += 10;
  });

  // Key Findings & Gaps (Moved to Page 2 per user request)
  if (gapDims.length > 0) {
    tableY += 12;
    doc.setTextColor(colors.maroon[0], colors.maroon[1], colors.maroon[2]);
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Key Findings & Strategic Gaps", 20, tableY);
    
    tableY += 6;
    gapDims.slice(0, 3).forEach((dim, idx) => { // Limit to 3 to ensure space on Page 2
      const content = reportContentMatrix[dim.name][dim.band];
      
      doc.setFillColor(255, 248, 248);
      doc.rect(20, tableY, 170, 24, "F");
      
      doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
      doc.setFontSize(9.5);
      doc.setFont("helvetica", "bold");
      doc.text(dim.name, 26, tableY + 6);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
      const obs = content.observations[0];
      const risk = content.risks[0] ? `Risk: ${content.risks[0]}` : "";
      
      const splitObs = doc.splitTextToSize(obs, 158);
      doc.text(splitObs, 26, tableY + 11);
      
      if (risk) {
        doc.setTextColor(colors.maroon[0], colors.maroon[1], colors.maroon[2]);
        doc.setFont("helvetica", "bold");
        doc.text(doc.splitTextToSize(risk, 158), 26, tableY + 11 + (splitObs.length * 4));
      }
      
      tableY += 28;
    });
  }

  addFooter(doc, 2);

  // --- PAGE 3: GAPS & ROADMAP ---
  doc.addPage();
  addHeader(doc, "Strategic Gaps & Roadmap");

  // What's Working Well (Moved to Page 3 to balance content)
  let roadmapY = 42;
  if (strongDims.length > 0) {
    doc.setTextColor(39, 174, 96); // Green
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("What's Working Well", 20, roadmapY);
    
    roadmapY += 6;
    strongDims.slice(0, 2).forEach(dim => {
      const content = reportContentMatrix[dim.name].Strong;
      doc.setFillColor(245, 252, 245);
      doc.rect(20, roadmapY, 170, 16, "F");
      
      doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(dim.name, 26, roadmapY + 6);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(colors.textSecondary[0], colors.textSecondary[1], colors.textSecondary[2]);
      const praise = content.observations[0];
      doc.text(doc.splitTextToSize(praise, 158), 26, roadmapY + 10.5);
      
      roadmapY += 20;
    });
  }

  // Top 3 Priorities
  roadmapY += 4;
  doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Top 3 Strategic Priorities", 20, roadmapY);
  
  roadmapY += 6;
  bottom3.forEach((dim, idx) => {
    const action = reportContentMatrix[dim.name][dim.band].actions[0];
    doc.setTextColor(colors.maroon[0], colors.maroon[1], colors.maroon[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`${idx + 1}.`, 20, roadmapY);
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(action, 160), 28, roadmapY);
    roadmapY += 9;
  });

  // Transformation Roadmap
  roadmapY += 8;
  doc.setFillColor(colors.darkGrey[0], colors.darkGrey[1], colors.darkGrey[2]);
  doc.rect(15, roadmapY, 180, 65, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(`${level.duration}-Month Transformation Roadmap`, 25, roadmapY + 10);
  
  const phaseStep = level.duration / 3;
  const phases = [
    { name: "PHASE 1", months: `Months 1-${phaseStep}`, actions: reportContentMatrix[bottom3[0].name][bottom3[0].band].actions },
    { name: "PHASE 2", months: `Months ${phaseStep + 1}-${phaseStep * 2}`, actions: reportContentMatrix[bottom3[1].name][bottom3[1].band].actions },
    { name: "PHASE 3", months: `Months ${phaseStep * 2 + 1}-${level.duration}`, title: level.phase3Name, actions: level.phase3Focus }
  ];

  let phaseX = 25;
  phases.forEach((p, i) => {
    doc.setTextColor(220, 220, 220);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.text(p.name, phaseX, roadmapY + 20);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.text(p.months, phaseX, roadmapY + 24);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(200, 200, 200);
    let actY = roadmapY + 31;
    p.actions.slice(0, 3).forEach(act => { // Strictly 3 actions
      const splitAct = doc.splitTextToSize(`• ${act}`, 52);
      doc.text(splitAct, phaseX, actY);
      actY += (splitAct.length * 3.5) + 1;
    });
    phaseX += 58;
  });

  // CTA Block
  roadmapY += 72;
  doc.setFillColor(colors.maroon[0], colors.maroon[1], colors.maroon[2]);
  doc.rect(15, roadmapY, 180, 38, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Next Step: Book Your Strategy Call", 25, roadmapY + 10);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  const ctaText = "Discuss these findings and your 90-day roadmap with our experts. PV Advisory helps businesses build finance functions that are controlled, visible and strategic.";
  doc.text(doc.splitTextToSize(ctaText, 160), 25, roadmapY + 17);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Sumit Kukreja  |  Founder  |  hello@pv-advisory.com", 25, roadmapY + 30);

  addFooter(doc, 3);

  if (shouldDownload) {
    doc.save(`${surveyType.replace(/\s+/g, "_")}_Report.pdf`);
  }
  
  return {
    dataUri: doc.output('datauristring'),
    blob: doc.output('blob')
  };
};

export const generateInternalReport = async (data, surveyQuestions) => {
  const { name, email, company_name, score, dimensionScores, answers, surveyType } = data;
  
  const doc = new jsPDF();
  const maroon = "#9f0202";

  doc.setFillColor(maroon);
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("INTERNAL SURVEY AUDIT", 20, 25);
  doc.setFontSize(10);
  doc.text(`User: ${name} | ${email} | ${company_name || "N/A"}`, 20, 32);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Survey: ${surveyType}`, 20, 50);
  doc.text(`Final Score: ${Math.round(score)}/150`, 150, 50);

  doc.line(20, 55, 190, 55);

  let y = 65;
  doc.setFontSize(10);
  
  surveyQuestions.forEach((q, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    doc.setFont("helvetica", "bold");
    const splitQ = doc.splitTextToSize(`${index + 1}. ${q.question}`, 170);
    doc.text(splitQ, 20, y);
    y += splitQ.length * 5;

    doc.setFont("helvetica", "normal");
    const scoreVal = answers[q.id];
    const selectedOption = q.options.find(opt => opt.score === scoreVal);
    const answerText = selectedOption ? selectedOption.text : "Skipped";
    
    doc.setTextColor(scoreVal >= 4 ? 22 : 159, scoreVal >= 4 ? 101 : 2, scoreVal >= 4 ? 52 : 2); 
    doc.text(`Answer: ${answerText} (Score: ${scoreVal || 0})`, 25, y);
    doc.setTextColor(0, 0, 0);
    
    y += 10;
  });

  return doc.output('datauristring');
};
