$(document).ready(function () {
    powerbi.bootstrap(embedContainer, {
        "type": "report"
    });
    embedThemesReport();
});

async function embedThemesReport() {

    const models = window["powerbi-client"].models;

    const accessToken = reportConfig.accessToken;

    const embedUrl = reportConfig.embedUrl;

    const embedReportId = reportConfig.reportId;

    const permissions = models.Permissions.View;

    const config = {
        type: "report",
        tokenType: models.TokenType.Embed,
        accessToken: accessToken,
        embedUrl: embedUrl,
        id: embedReportId,
        permissions: permissions,
        settings: {
            panes: {
                filters: {
                    expanded: false,
                    visible: false
                },
                pageNavigation: {
                    visible: false
                },
            },
            layoutType: models.LayoutType.Custom,
            customLayout: {
                displayOption: models.DisplayOption.FitToPage
            },
            background: models.BackgroundType.Transparent
        },
    };

    themesShowcaseState.themesReport = powerbi.embed(embedContainer, config);
    themesShowcaseState.themesReport.on("loaded", function () {
        overlay.hide();
        $(".content").show();
    });
}
