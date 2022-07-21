import { ObjectsRegistry } from "../../../../support/Objects/Registry";

let guid: any, jsName: any, dsl: any;
const agHelper = ObjectsRegistry.AggregateHelper,
  ee = ObjectsRegistry.EntityExplorer,
  dataSources = ObjectsRegistry.DataSources,
  jsEditor = ObjectsRegistry.JSEditor,
  table = ObjectsRegistry.Table,
  locator = ObjectsRegistry.CommonLocators,
  homePage = ObjectsRegistry.HomePage,
  apiPage = ObjectsRegistry.ApiPage,
  deployMode = ObjectsRegistry.DeployMode,
  propPane = ObjectsRegistry.PropertyPane;

describe("JSObjects OnLoad Actions tests", function() {
  before(() => {});

  it("1. Tc #58 Verify JSOnPageload with ConfirmBefore calling - while imported", () => {
    homePage.NavigateToHome();
    homePage.CreateNewWorkspace("JSOnLoadTest");
    homePage.ImportApp("ImportApps/JSOnLoadImport.json", "JSOnLoadTest");
    cy.wait("@importNewApplication").then(() => {
      agHelper.Sleep();
      dataSources.ReconnectDataSource("MySQL-Ds", "MySQL");
    });
    AssertJSOnPageLoad(true);
  });

  it("2. Tc #58 Verify JSOnPageload with ConfirmBefore calling - while forked & duplicated", () => {
    homePage.NavigateToHome();
    homePage.ForkApplication("JSOnloadImportTest");
    AssertJSOnPageLoad();

    homePage.NavigateToHome();
    homePage.DuplicateApplication("JSOnloadImportTest");
    AssertJSOnPageLoad();
  });

  it("3. Delete the applications & workspace", () => {
    homePage.NavigateToHome();
    homePage.DeleteApplication("JSOnloadImportTest");
    homePage.DeleteApplication("JSOnloadImportTest (1)");
    homePage.DeleteApplication("JSOnloadImportTest Copy");
    agHelper.WaitUntilToastDisappear("Deleting application...");
    homePage.DeleteWorkspace("JSOnLoadTest");
  });

  function AssertJSOnPageLoad(shouldCheckImport = false) {
    agHelper.AssertElementVisible(
      jsEditor._dialogBody("JSObject1.runSpaceCraftImages"),
    );
    agHelper.ClickButton("No");
    agHelper.Sleep(1000);

    shouldCheckImport && homePage.AssertNCloseImport();

    deployMode.DeployApp();
    agHelper.AssertElementVisible(
      jsEditor._dialogBody("JSObject1.runSpaceCraftImages"),
    );
    agHelper.ClickButton("Yes");
    agHelper.Sleep(3000);
    deployMode.NavigateBacktoEditor();
    agHelper.ClickButton("No");
  }
});