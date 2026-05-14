const lessons = [
  {
    id: "intro",
    phase: "Phase 1",
    title: "Start Here: C# for Revit Users",
    minutes: 20,
    summary: "Understand programming using BIM and Dynamo-style thinking.",
    content:
      "Programming is giving clear instructions to the computer. In Revit, you may manually select cable trays, check parameters, and update values. In C#, you write that workflow as repeatable instructions. Think of C# as creating your own custom Dynamo nodes, but with more control.",
    code:
`Manual BIM Task:
1. Find all cable trays
2. Check Service Name
3. Report empty values

Programming Logic:
For each cable tray:
    If Service Name is empty:
        Add it to the report`,
    practice:
      "Write down one repetitive Revit task you do weekly. Convert it into numbered steps.",
    mistakes: [
      "Trying to memorize everything before building anything.",
      "Starting with complex add-ins too early.",
      "Copying code without understanding the BIM workflow."
    ]
  },
  {
    id: "variables",
    phase: "Phase 1",
    title: "Variables and Data Types",
    minutes: 30,
    summary: "Store Revit-like information such as names, counts, widths, and yes/no values.",
    content:
      "A variable is a container for information. A cable tray name can be stored as text, a count as a whole number, a width as a decimal, and a yes/no check as true or false.",
    code:
`string elementName = "Cable Tray";
int trayCount = 25;
double trayWidth = 300.0;
bool hasServiceName = true;`,
    practice:
      "Create variables for fixture name, circuit number, mounting height, and emergency status.",
    mistakes: [
      "Forgetting quotation marks around text.",
      "Using int for decimal values.",
      "Not giving variables clear names."
    ]
  },
  {
    id: "conditions",
    phase: "Phase 1",
    title: "Conditions: If This, Then That",
    minutes: 30,
    summary: "Use if/else logic to check Revit data.",
    content:
      "Conditions help your code make decisions. In BIM QA/QC, you often ask: If a parameter is empty, should I report it? If an element belongs to a category, should I process it?",
    code:
`string serviceName = "";

if (serviceName == "")
{
    TaskDialog.Show("Check", "Service Name is missing.");
}
else
{
    TaskDialog.Show("Check", "Service Name is filled.");
}`,
    practice:
      "Write logic for: If Circuit Number is empty, show a warning.",
    mistakes: [
      "Using = instead of == when comparing values.",
      "Forgetting curly braces.",
      "Not checking empty or null values."
    ]
  },
  {
    id: "loops",
    phase: "Phase 1",
    title: "Loops: Repeat Work Automatically",
    minutes: 35,
    summary: "Loop through many Revit elements one by one.",
    content:
      "A loop repeats an action. Instead of checking one cable tray manually, a loop can check all cable trays in the model.",
    code:
`foreach (Element element in elements)
{
    string name = element.Name;
}`,
    practice:
      "Create a list of 5 parameter names and imagine checking each one in a loop.",
    mistakes: [
      "Forgetting that a list may be empty.",
      "Showing one dialog for every element.",
      "Trying to modify a collection while looping through it."
    ]
  },
  {
    id: "methods",
    phase: "Phase 1",
    title: "Methods: Reusable Checks",
    minutes: 40,
    summary: "Create small reusable blocks of logic.",
    content:
      "A method is a reusable instruction. Instead of writing the same parameter check many times, create one method and reuse it for cable trays, fixtures, and conduits.",
    code:
`public bool HasParameter(Element element, string parameterName)
{
    Parameter parameter = element.LookupParameter(parameterName);

    return parameter != null;
}`,
    practice:
      "Create a method idea called CheckMissingParameter. Write what inputs it needs and what result it should return.",
    mistakes: [
      "Writing everything inside one huge Execute method.",
      "Using unclear method names.",
      "Forgetting to return a value."
    ]
  },
  {
    id: "oop",
    phase: "Phase 2",
    title: "Classes and Objects for Revit Reports",
    minutes: 45,
    summary: "Use simple classes to organize report data.",
    content:
      "A class is like a Revit family type. An object is like a placed family instance. For Revit automation, classes are useful for storing clean reports.",
    code:
`public class MissingParameterReport
{
    public int ElementId { get; set; }
    public string ElementName { get; set; }
    public string MissingParameterName { get; set; }
}`,
    practice:
      "Create a FixtureCheckResult class with ElementId, FixtureName, MissingParameterName, and LevelName.",
    mistakes: [
      "Thinking classes are only advanced theory.",
      "Creating too many classes too early.",
      "Not using classes for clean report data."
    ]
  },
  {
    id: "revit-structure",
    phase: "Phase 3",
    title: "Understanding Revit API Structure",
    minutes: 50,
    summary: "Understand Document, Element, Category, Parameter, and Transaction.",
    content:
      "The Revit model behaves like a database. Document is the project file. Element is almost anything inside the model. Parameter is data attached to an element. Transaction is required when changing the model.",
    code:
`UIApplication uiapp = commandData.Application;
UIDocument uidoc = uiapp.ActiveUIDocument;
Document doc = uidoc.Document;

TaskDialog.Show("Current Model", doc.Title);`,
    practice:
      "Explain the difference between Document and UIDocument in your own words.",
    mistakes: [
      "Using UIDocument when Document is required.",
      "Trying to modify Revit without a transaction.",
      "Forgetting that ActiveUIDocument can be null."
    ]
  },
  {
    id: "setup",
    phase: "Phase 4",
    title: "Setup: VS Code + Revit API",
    minutes: 60,
    summary: "Prepare your local environment for add-in development.",
    content:
      "Install Revit, VS Code, .NET SDK, C# extension, and reference RevitAPI.dll and RevitAPIUI.dll from your Revit installation folder.",
    code:
`<Reference Include="RevitAPI">
  <HintPath>C:\\Program Files\\Autodesk\\Revit 2026\\RevitAPI.dll</HintPath>
  <Private>false</Private>
</Reference>

<Reference Include="RevitAPIUI">
  <HintPath>C:\\Program Files\\Autodesk\\Revit 2026\\RevitAPIUI.dll</HintPath>
  <Private>false</Private>
</Reference>`,
    practice:
      "Create a project folder named MyFirstRevitAddin and add Command.cs.",
    mistakes: [
      "Referencing the wrong Revit version DLL.",
      "Forgetting to set Private to false.",
      "Using wrong target framework for your Revit version."
    ]
  },
  {
    id: "hello-world",
    phase: "Phase 4",
    title: "First Add-in: Hello World",
    minutes: 45,
    summary: "Create your first Revit command using IExternalCommand.",
    content:
      "Every basic Revit button command starts with IExternalCommand and the Execute method. Revit calls Execute when the user runs your tool.",
    code:
`public class Command : IExternalCommand
{
    public Result Execute(
        ExternalCommandData commandData,
        ref string message,
        ElementSet elements)
    {
        TaskDialog.Show("My First Add-in", "Hello from Revit API!");

        return Result.Succeeded;
    }
}`,
    practice:
      "Change the message to show your active model name.",
    mistakes: [
      "Changing the Execute method signature.",
      "Wrong FullClassName in the .addin file.",
      "Forgetting to build the project after editing code."
    ]
  },
  {
    id: "collect-elements",
    phase: "Phase 4",
    title: "Collecting Elements",
    minutes: 50,
    summary: "Use FilteredElementCollector to find cable trays and fixtures.",
    content:
      "FilteredElementCollector is your search tool inside Revit. You can use it to collect all cable trays, conduits, lighting fixtures, or other categories.",
    code:
`var cableTrays = new FilteredElementCollector(doc)
    .OfCategory(BuiltInCategory.OST_CableTray)
    .WhereElementIsNotElementType()
    .ToElements();

TaskDialog.Show("Cable Trays", $"Found: {cableTrays.Count}");`,
    practice:
      "Create similar collectors for electrical fixtures and lighting fixtures.",
    mistakes: [
      "Forgetting WhereElementIsNotElementType.",
      "Using the wrong BuiltInCategory.",
      "Expecting linked model elements to appear automatically."
    ]
  },
  {
    id: "parameters",
    phase: "Phase 4",
    title: "Reading and Updating Parameters",
    minutes: 60,
    summary: "Read Service Name, Comments, Panel, and Circuit Number.",
    content:
      "Parameters are Revit data fields. Always check whether the parameter exists and whether it is read-only before updating it.",
    code:
`Parameter commentsParam = element.LookupParameter("Comments");

if (commentsParam != null && !commentsParam.IsReadOnly)
{
    commentsParam.Set("Checked by BIM Automation");
}`,
    practice:
      "Read the Comments parameter from selected cable trays. Then update it inside a transaction.",
    mistakes: [
      "Assuming every element has the same parameter.",
      "Trying to set read-only parameters.",
      "Using AsString for non-text parameters."
    ]
  },
  {
    id: "transactions",
    phase: "Phase 4",
    title: "Transactions",
    minutes: 40,
    summary: "Safely modify the Revit model.",
    content:
      "If you only read data, no transaction is needed. If you change the model, you must use a transaction. It is Revit's safety gate.",
    code:
`using (Transaction tx = new Transaction(doc, "Update Comments"))
{
    tx.Start();

    parameter.Set("Checked by API");

    tx.Commit();
}`,
    practice:
      "Create a batch update transaction that updates Comments for all cable trays.",
    mistakes: [
      "Starting a transaction just to read data.",
      "Forgetting tx.Commit.",
      "Trying to modify outside a transaction."
    ]
  },
  {
    id: "ui-debugging",
    phase: "Phase 5",
    title: "UI Basics and Debugging",
    minutes: 45,
    summary: "Use TaskDialog and simple debugging techniques.",
    content:
      "TaskDialog is useful for simple messages and beginner debugging. You can show element counts, parameter values, and confirmation messages.",
    code:
`TaskDialogResult result = TaskDialog.Show(
    "Confirm",
    "Do you want to update cable tray comments?",
    TaskDialogCommonButtons.Yes | TaskDialogCommonButtons.No);

if (result != TaskDialogResult.Yes)
{
    return Result.Cancelled;
}`,
    practice:
      "Before modifying parameters, ask the user whether they want to continue.",
    mistakes: [
      "Showing too many dialogs.",
      "Debugging only by guessing.",
      "Not testing on a small model first."
    ]
  },
  {
    id: "final-project",
    phase: "Final Project",
    title: "MEP Parameter Health Checker",
    minutes: 90,
    summary: "Build a real QA/QC add-in for MEP model checking.",
    content:
      "Create a tool that checks Cable Trays, Cable Tray Fittings, Electrical Fixtures, Lighting Fixtures, and Conduits for missing required parameters. Show a summary and optionally update Comments.",
    code:
`Categories to check:

Cable Trays:
- Service Name
- Comments

Electrical Fixtures:
- Panel
- Circuit Number
- Comments

Lighting Fixtures:
- Circuit Number
- Comments

Conduits:
- Comments`,
    practice:
      "Build the checker in small steps: collect, read, check, report, then modify only after testing.",
    mistakes: [
      "Trying to build everything in one step.",
      "Testing directly on a live project model.",
      "Not producing a clear report."
    ]
  }
];

let currentLessonIndex = Number(localStorage.getItem("currentLessonIndex")) || 0;
let completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || {};
let notes = JSON.parse(localStorage.getItem("lessonNotes")) || {};
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

const lessonList = document.getElementById("lessonList");
const lessonPhase = document.getElementById("lessonPhase");
const lessonTitle = document.getElementById("lessonTitle");
const lessonSummary = document.getElementById("lessonSummary");
const lessonContent = document.getElementById("lessonContent");
const lessonCode = document.getElementById("lessonCode");
const lessonPractice = document.getElementById("lessonPractice");
const lessonMistakes = document.getElementById("lessonMistakes");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const completedText = document.getElementById("completedText");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const completeBtn = document.getElementById("completeBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const resetBtn = document.getElementById("resetBtn");
const notesArea = document.getElementById("notesArea");
const downloadCodeBtn = document.getElementById("downloadCodeBtn");

function saveProgress() {
  localStorage.setItem("currentLessonIndex", currentLessonIndex);
  localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  localStorage.setItem("lessonNotes", JSON.stringify(notes));
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}

function renderLessonList() {
  lessonList.innerHTML = "";

  const phases = [...new Set(lessons.map(lesson => lesson.phase))];

  phases.forEach(phase => {
    const phaseTitle = document.createElement("div");
    phaseTitle.className = "phase-title";
    phaseTitle.textContent = phase;
    lessonList.appendChild(phaseTitle);

    lessons.forEach((lesson, index) => {
      if (lesson.phase !== phase) return;

      const button = document.createElement("button");
      button.className = "lesson-btn";

      if (index === currentLessonIndex) {
        button.classList.add("active");
      }

      if (completedLessons[lesson.id]) {
        button.classList.add("completed");
      }

      button.textContent = lesson.title;

      button.addEventListener("click", () => {
        currentLessonIndex = index;
        saveProgress();
        renderApp();
      });

      lessonList.appendChild(button);
    });
  });
}

function renderLesson() {
  const lesson = lessons[currentLessonIndex];

  lessonPhase.textContent = `${lesson.phase} • ${lesson.minutes} min`;
  lessonTitle.textContent = lesson.title;
  lessonSummary.textContent = lesson.summary;
  lessonContent.textContent = lesson.content;
  lessonCode.textContent = lesson.code;
  lessonPractice.textContent = lesson.practice;

  lessonMistakes.innerHTML = "";
  lesson.mistakes.forEach(mistake => {
    const li = document.createElement("li");
    li.textContent = mistake;
    lessonMistakes.appendChild(li);
  });

  notesArea.value = notes[lesson.id] || "";

  completeBtn.textContent = completedLessons[lesson.id]
    ? "Completed ✓"
    : "Mark Complete";

  prevBtn.disabled = currentLessonIndex === 0;
  nextBtn.disabled = currentLessonIndex === lessons.length - 1;
}

function renderProgress() {
  const completedCount = lessons.filter(lesson => completedLessons[lesson.id]).length;
  const percentage = Math.round((completedCount / lessons.length) * 100);

  progressText.textContent = `${percentage}%`;
  progressFill.style.width = `${percentage}%`;
  completedText.textContent = `${completedCount} of ${lessons.length} lessons completed`;
}

function renderTheme() {
  if (darkMode) {
    document.body.classList.add("dark");
    darkModeBtn.textContent = "☀️ Light Mode";
  } else {
    document.body.classList.remove("dark");
    darkModeBtn.textContent = "🌙 Dark Mode";
  }
}

function renderApp() {
  renderTheme();
  renderLessonList();
  renderLesson();
  renderProgress();
}

completeBtn.addEventListener("click", () => {
  const lesson = lessons[currentLessonIndex];
  completedLessons[lesson.id] = !completedLessons[lesson.id];

  saveProgress();
  renderApp();
});

nextBtn.addEventListener("click", () => {
  if (currentLessonIndex < lessons.length - 1) {
    currentLessonIndex++;
    saveProgress();
    renderApp();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentLessonIndex > 0) {
    currentLessonIndex--;
    saveProgress();
    renderApp();
  }
});

darkModeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  saveProgress();
  renderApp();
});

resetBtn.addEventListener("click", () => {
  const confirmReset = confirm("Are you sure you want to reset all progress and notes?");

  if (!confirmReset) return;

  currentLessonIndex = 0;
  completedLessons = {};
  notes = {};
  darkMode = false;

  saveProgress();
  renderApp();
});

notesArea.addEventListener("input", () => {
  const lesson = lessons[currentLessonIndex];
  notes[lesson.id] = notesArea.value;
  saveProgress();
});

downloadCodeBtn.addEventListener("click", () => {
  const lesson = lessons[currentLessonIndex];
  const fileContent = lesson.code;

  const blob = new Blob([fileContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${lesson.id}-code-snippet.txt`;
  link.click();

  URL.revokeObjectURL(url);
});

renderApp();