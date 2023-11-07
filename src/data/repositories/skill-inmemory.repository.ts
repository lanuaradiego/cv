import Skill from "../../domain/models/skill.model";
import SkillRepository from "../../domain/repositories/skill.repository";

export default class SkillInMemoryRepository implements SkillRepository {

    //#region Android
    public static readonly androidJava = new Skill("Java", 5, "", null);
    public static readonly androidKotlin = new Skill("Kotlin", 5, "", null);
    //
    public static readonly androidHttpRequestKtor = new Skill("KTor", "n/a", "", null);
    public static readonly androidHttpRequestRetrofit = new Skill("RetroFit", "n/a", "", null);
    public static readonly androidHttpRequestVolley = new Skill("Volley", "n/a", "", null);
    public static readonly androidHttpRequest = new Skill("HTTP Request", "n/a", "", [
        this.androidHttpRequestRetrofit,
        this.androidHttpRequestKtor,
        this.androidHttpRequestVolley]
    );
    //
    public static readonly androidViButterKnife = new Skill("Butter Knife", "n/a", "", null);
    public static readonly androidViViewBinding = new Skill("View Binding", "n/a", "", null);
    public static readonly androidVi = new Skill("View Injection", "n/a", "", [
        this.androidViButterKnife,
        this.androidViViewBinding
    ]);
    //
    public static readonly androidNotificationPushFirebase = new Skill("Firebase", "n/a", "", null);
    public static readonly androidNotificationPush = new Skill("Notifications Push", "n/a", "", [
        this.androidNotificationPushFirebase,
    ]);
    //
    public static readonly androidOrmRoom = new Skill("Room", "n/a", "", null);
    public static readonly androidOrm = new Skill("ORM", "n/a", "", [
        this.androidOrmRoom,
    ]);
    //
    public static readonly androidDependencyInjectionDaggerHilt = new Skill("Dagger Hilt", "n/a", "", null);
    public static readonly androidDependencyInjection = new Skill("Dependency Injection", "n/a", "", [
        this.androidDependencyInjectionDaggerHilt,
    ]);
    //
    public static readonly androidTestingComposeRule = new Skill("ComposeRule", "n/a", "", null);
    public static readonly androidTestingJunit = new Skill("JUnit", "n/a", "", null);
    public static readonly androidTestingEspresso = new Skill("Espresso", "n/a", "", null);
    public static readonly androidTesting = new Skill("Testing", "n/a", "", [
        this.androidTestingComposeRule,
        this.androidTestingEspresso,
        this.androidTestingJunit,
    ]);
    //
    public static readonly androidReactiveProgrammingFlow = new Skill("Flow", "n/a", "", null);
    public static readonly androidReactiveProgrammingLiveData = new Skill("LiveData", "n/a", "", null);
    public static readonly androidReactiveProgrammingRxJava = new Skill("RxJava", "n/a", "", null);
    public static readonly androidReactiveProgrammingRxKotlin = new Skill("RxKotlin", "n/a", "", null);
    public static readonly androidReactiveProgramming = new Skill("Reactive Programming", "n/a", "", [
        this.androidReactiveProgrammingFlow,
        this.androidReactiveProgrammingLiveData,
        this.androidReactiveProgrammingRxJava,
        this.androidReactiveProgrammingRxKotlin,
    ]);
    //
    public static readonly androidUiCompose = new Skill("Jetpack Compose", "n/a", "", null);
    public static readonly androidUiXml = new Skill("XML", "n/a", "", null);
    public static readonly androidUi = new Skill("UI", "n/a", "", [
        this.androidUiCompose,
        this.androidUiXml,
    ]);
    //
    public static readonly androidArchitectureClean = new Skill("Clean Architecture", "n/a", "By uncle Bob", null);
    public static readonly androidArchitectureMvvm = new Skill("MVVM", "n/a", "", null);
    public static readonly androidArchitectureMvi = new Skill("MVI", "n/a", "", null);
    public static readonly androidArchitectureModularization = new Skill("Modularization", "n/a", "", null);
    public static readonly androidArchitecture = new Skill("Architecture", "n/a", "", [
        this.androidArchitectureClean,
        this.androidArchitectureMvvm,
        this.androidArchitectureMvi,
        this.androidArchitectureModularization,
    ]);
    //
    public static readonly androidMonitoringDynatrace = new Skill("Dynatrace", "n/a", "", null);
    public static readonly androidMonitoringBroadcomm = new Skill("Broadcomm AXA", "n/a", "", null);
    public static readonly androidMonitoring = new Skill("Monitoring ", "n/a", "", [
        this.androidMonitoringDynatrace,
        this.androidMonitoringBroadcomm,
    ]);
    //
    public static readonly androidTaggingGtm = new Skill("Google Tag Manager", "n/a", "", null);
    public static readonly androidTaggingAppsflyer = new Skill("Appsflyer", "n/a", "", null);
    public static readonly androidTagging = new Skill("Tagging ", "n/a", "", [
        this.androidTaggingGtm,
        this.androidTaggingAppsflyer,
    ]);
    //
    public static readonly androidBiometricsFacephi = new Skill("Facephi", "n/a", "", null);
    public static readonly androidBiometricsFlexid = new Skill("Transmit FlexID", "n/a", "", null);
    public static readonly androidBiometrics = new Skill("Biometrics ", "n/a", "", [
        this.androidBiometricsFacephi,
        this.androidBiometricsFlexid,
    ]);
    //    
    public static readonly android = new Skill("Android", 5, "", [
        this.androidJava,
        this.androidKotlin,
        this.androidHttpRequest,
        this.androidVi,
        this.androidNotificationPush,
        this.androidOrm,
        this.androidDependencyInjection,
        this.androidTesting,
        this.androidReactiveProgramming,
        this.androidUi,
        this.androidArchitecture,
        this.androidMonitoring,
        this.androidTagging,
        this.androidBiometrics,
    ]);
    //#endregion

    //#region Web
    public static readonly webHtml5 = new Skill("HTML5", 4, "", null);
    public static readonly webCss3 = new Skill("CSS3", 3, "", null);
    public static readonly webTypescript = new Skill("Typescript", 5, "", null);
    public static readonly webJavascript = new Skill("Javascript", 5, "Vanilla JS", null);
    public static readonly webGoogleMapsv3 = new Skill("Google Maps v3", "n/a", "", null);
    public static readonly webMicroFrontend = new Skill("MicroFrontend", "n/a", "Using Single-SPA", null);
    public static readonly webPromise = new Skill("Promise", 5, "With async/await", null);
    public static readonly webCanvas = new Skill("Canvas", 5, "", null);
    public static readonly web = new Skill("Web", 4, "", [
        this.webHtml5,
        this.webCss3,
        this.webTypescript,
        this.webJavascript,
        this.webGoogleMapsv3,
        this.webMicroFrontend,
        this.webPromise,
        this.webCanvas,
    ]);
    //#endregion

    //#region .NET
    public static readonly netRestApi = new Skill("Rest API", "n/a", "", null);
    public static readonly netMicroservice = new Skill("Microservices", "n/a", "", null);
    public static readonly netTask = new Skill(".NET Tasks", "n/a", "", null);
    public static readonly netOData = new Skill("OData query", "n/a", "", null);
    public static readonly netLinq = new Skill("LINQ", "n/a", "", null);
    public static readonly netMutex = new Skill("Mutex", "n/a", "Mutex, Lock, Semaphore", null);
    public static readonly netFrameworkWinForms = new Skill("WinForms", "n/a", "", null);
    public static readonly netFrameworkConsoleApps = new Skill("Console Applications", "n/a", "", null);
    public static readonly netFrameworkWindowsServices = new Skill("Windows Services", "n/a", "", null);
    public static readonly netFrameworkSockets = new Skill("Sockets", "n/a", "Client/server applications", null);
    public static readonly netFrameworkEncryption = new Skill("Encryption", "n/a", "Symmetric and asymmetric", null);
    public static readonly netFramework = new Skill(".NET Framework", 4, "4.x", [
        this.netRestApi,
        this.netFrameworkWinForms,
        this.netFrameworkConsoleApps,
        this.netFrameworkWindowsServices,
        this.netFrameworkSockets,
        this.netFrameworkEncryption,
        this.netTask,
        this.netOData,
        this.netLinq,
        this.netMutex,
        this.netMicroservice,
    ]);
    public static readonly netCoreDocker = new Skill("Docker", "n/a", "File and Compose", null);
    public static readonly netCoreKubernetes = new Skill("Kubernetes", "n/a", "", null);
    public static readonly netCoreSwashbuckle = new Skill("Swashbuckle", "n/a", "Swagger and Swagger UI", null);
    public static readonly netCoreApigatewayOcelot = new Skill("API Gateway Ocelot", "n/a", "", null);
    public static readonly netCore = new Skill(".NET Core", 3, "4.x", [
        this.netRestApi,
        this.netTask,
        this.netOData,
        this.netLinq,
        this.netMutex,
        this.netCoreSwashbuckle,
        this.netCoreDocker,
        this.netCoreKubernetes,
        this.netMicroservice,
        this.netCoreApigatewayOcelot,
    ]);
    public static readonly net = new Skill("C# .NET", 3, "", [
        this.netCore,
        this.netFramework,
    ]);
    //#endregion

    //#region Database
    public static readonly databaseDer = new Skill("DER", "n/a", "Interpret and model entity relationship diagrams", null);
    public static readonly databaseEssential = new Skill("Essential: PK, FK, Index, SP, Triggers, Checks, Boyce–Codd normal form", "n/a", "", null);
    public static readonly databasePostgreSqlPartitions = new Skill("Partitions", "n/a", "", null);
    public static readonly databasePostgreSqlPlsql = new Skill("PLSQL", "n/a", "", null);
    public static readonly databasePostgreSqlJsonb = new Skill("jsonb", "n/a", "Datatype", null);
    public static readonly databasePostgreSql = new Skill("PostgreSQL", 5, "9.6", [
        this.databasePostgreSqlPlsql,
        this.databasePostgreSqlPartitions,
        this.databasePostgreSqlJsonb,
    ]);

    public static readonly databaseSqlServerTsql = new Skill("T-SQL", "n/a", "", null);
    public static readonly databaseSqlServer = new Skill("SQL Server 2008", 4, "", [
        this.databaseSqlServerTsql,
    ]);

    public static readonly databaseRedis = new Skill("Redis", 3, "", null);
    public static readonly databaseMemcached = new Skill("Memcached", 3, "", null);

    public static readonly database = new Skill("Databases", 3, "", [
        this.databaseDer,
        this.databaseEssential,
        this.databasePostgreSql,
        this.databaseSqlServer,
        this.databaseRedis,
        this.databaseMemcached,
    ]);
    //#endregion

    //#region Planning and DevOps
    public static readonly planningAzureDevops = new Skill("Azure Devops", 5, "Build dashboards, WIKIs, scrum ceremonies, Kanban, repos, testing, pipelines, arftifacts, external integrations (Google Play), deploys", null);
    public static readonly planningJira = new Skill("Jira", 4, "Kanban, boards, code, releases, components", null);
    public static readonly planningVisualParadigm = new Skill("Visual Paradigm", 3, "User stories, use case diagram, class diagram, sequence diagram, activity diagram, component diagram, deploy diagram, state machine, wireframes, wireflow, C4 model, stereotype, doc. composer", null);
    public static readonly planningScrum = new Skill("Scrum", 4, "Agile methodology", null);
    public static readonly planning = new Skill("Planning", 4, "", [
        this.planningAzureDevops,
        this.planningJira,
        this.planningVisualParadigm,
        this.planningScrum,
    ]);

    public static readonly devopsAzureDevopsAndroid = new Skill("Azure Devops - Android", 5, "Development of pipelines to compile build variants, sign, run unit tests, and automatically deploy them to Google Play and Galaxy Store when merging into a specific branch.", null);
    public static readonly devopsAzureDevopsNet = new Skill("Azure Devops - .NET Core", 5, "Development of pipelines to compile with dotnet, run unit tests, and automatically deploy to IIS when merging into a specific branch.", null);
    public static readonly devops = new Skill("DevOps", 2, "", [
        this.devopsAzureDevopsAndroid,
        this.devopsAzureDevopsNet,
    ]);
    //#endregion

    //#region Others
    public static readonly othersCordova = new Skill("Apache Cordova 10/11", 5, "Create plugins and compile.", null);
    public static readonly othersBash = new Skill("Bash", 3, "Scripts to automate Android tests and builds.", null);
    public static readonly othersVB6 = new Skill("Visual Basic 6 / VBA", 3, "", null);
    public static readonly othersGooglePlay = new Skill("Google Play Console", 5, "management, upload and deploy, beta testings, graphic resources, crash analysis and ANRs, ratings and reviews.", null);
    public static readonly othersAppstore = new Skill("Appstore Development", 1, "add devices for internal testing, generate bundleIDs, add capabilities, export certificates and provisioning.", null);
    public static readonly othersGit = new Skill("Git", 1, "", null);
    public static readonly othersGimp = new Skill("GIMP", 2, "convert images in different extensions, compress images (indexed color), add transparencies.", null);
    public static readonly othersMikrotick = new Skill("Mikrotik Router", 2, "Configure OpenVPNs, NATs, define adresses and DHCP Pools, configure SSIDs, networks and subnet masks.", null);
    public static readonly others = new Skill("Others", "n/a", "", [
        this.othersCordova,
        this.othersBash,
        this.othersVB6,
        this.othersGooglePlay,
        this.othersAppstore,
        this.othersGit,
        this.othersGimp,
        this.othersMikrotick,
    ]);
    //#endregion

    getAllSkills(): Promise<Skill[]> {
        return Promise.resolve([
            SkillInMemoryRepository.android,
            SkillInMemoryRepository.web,
            SkillInMemoryRepository.net,
            SkillInMemoryRepository.database,
            SkillInMemoryRepository.planning,
            SkillInMemoryRepository.devops,
            SkillInMemoryRepository.others,
        ]);
    }
    async getSkill(skillName: string): Promise<Skill | null> {
        return Promise.resolve(this.findSkill(
            await this.getAllSkills(),
            name => name == skillName
        ));
    }
    getAndroidSkills(): Promise<Skill> {
        return Promise.resolve(SkillInMemoryRepository.android);
    }
    getWebSkills(): Promise<Skill> {
        return Promise.resolve(SkillInMemoryRepository.web);
    }
    getCSharpSkills(): Promise<Skill> {
        return Promise.resolve(SkillInMemoryRepository.net);
    }
    getDatabasesSkills(): Promise<Skill> {
        return Promise.resolve(SkillInMemoryRepository.database);
    }
    getPlanningToolSkills(): Promise<Skill> {
        return Promise.resolve(SkillInMemoryRepository.planning);
    }
    getDevopsSkills(): Promise<Skill> {
        return Promise.resolve(SkillInMemoryRepository.devops);
    }
    getOthersSkills(): Promise<Skill> {
        return Promise.resolve(SkillInMemoryRepository.others);
    }

    findSkill(skills: Skill[], predicate: (skillName: string) => boolean): Promise<Skill | null> {
        return new Promise(resolve => {
            const stack: Skill[] = [...skills];
            while (stack.length > 0) {
                const currentSkill = stack.pop();
                if (currentSkill) {
                    if (predicate(currentSkill.name)) {
                        resolve(currentSkill);
                        return;
                    }
                    if (currentSkill.subSkills !== null)
                        stack.push(...currentSkill.subSkills);
                }
            }
            return resolve(null);
        });
    }
}