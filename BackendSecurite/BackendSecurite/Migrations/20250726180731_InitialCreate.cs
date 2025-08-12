using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendSecurite.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrixAvant = table.Column<double>(type: "float", nullable: false),
                    PrixApres = table.Column<double>(type: "float", nullable: false),
                    Quantite = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Utilisateurs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilisateurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UtilisateurId = table.Column<int>(type: "int", nullable: false),
                    ServiceType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adresse = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Paiement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Urgence = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceRequests_Utilisateurs_UtilisateurId",
                        column: x => x.UtilisateurId,
                        principalTable: "Utilisateurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Articles",
                columns: new[] { "Id", "Description", "Image", "PrixApres", "PrixAvant", "Quantite", "Titre", "Type" },
                values: new object[,]
                {
                    { 1, "Take up to 18 months to pay with as low as 0% APR on some term lengths and no late fees", "assets/images/P2.jpg", 349.0, 450.99000000000001, 7, "Pack Sécurité ULTRA", "pack" },
                    { 2, "Vidéo 2K avancée avec multiples options d'alimentation.", "assets/images/C3.jpg", 119.98999999999999, 0.0, 5, "CAMERA HD HIKVISION", "camera" },
                    { 3, "Sound the alarm, notify loved ones, and request emergency help when you need it with Alarm Panic Button. You can press and hold the Panic Button for three seconds to sound the siren on your Ring Alarm.", "assets/images/A2.jpg", 39.990000000000002, 0.0, 12, "Panic Button", "alarm" },
                    { 4, "Vidéo 2K avancée avec multiples options d'alimentation.", "assets/images/C6.jpg", 109.98999999999999, 0.0, 6, "CAMERA UNIARCH IP", "camera" },
                    { 5, "Caméra Bullet UNIARCH IP 2MP IR30 Audio UV-IPC-B122-AFP28(40) - Surveillance Extérieure Haute Performance Solution professionnelle pour une protection 24h/24 des espaces extérieurs Son design bullet et sa technologie IR30m en font un choix idéal pour les parkings, entrepôts et périmètres sécurisés.", "assets/images/C1.jpg", 89.989999999999995, 0.0, 10, "Outdoor Cam", "camera" },
                    { 6, "Enjoy four battery-powered Pathlights that shine light on walkways, driveways and pathways when motion is detected. Connect Pathlights to the included Ring Bridge to enable smart controls in the Ring App and sync with other Ring Smart Lights", "assets/images/P4.jpg", 280.0, 500.99000000000001, 4, "Pack 8 caméras de surveillance 5MP D-LINK", "camera" },
                    { 7, "Pack de 2 caméras pour une sécurité renforcée.", "assets/images/C2.jpg", 139.0, 159.97999999999999, 9, "CAMERA BULLET UNIARCH", "camera" },
                    { 8, "Take up to 18 months to pay with as low as 0% APR on some term lengths and no late fees", "assets/images/P1.jpg", 129.0, 0.0, 4, "Pack Floodlight Cam Pro", "pack" },
                    { 9, "Take up to 18 months to pay with as low as 0% APR on some term lengths and no late fees", "assets/images/A3.jpg", 39.0, 0.0, 6, "Alarm Window and Door Contact Sensor", "pack" },
                    { 10, "Enjoy four battery-powered Pathlights that shine light on walkways, driveways and pathways when motion is detected. Connect Pathlights to the included Ring Bridge to enable smart controls in the Ring App and sync with other Ring Smart Lights", "assets/images/P3.jpg", 369.0, 450.99000000000001, 6, "Pathlight 4-Pack + Bridge", "pack" },
                    { 11, "Vidéo 2K avancée avec multiples options d'alimentation.", "assets/images/C5.jpg", 109.0, 0.0, 7, "Smart Hybrid Light Camera", "camera" },
                    { 12, "The central core of your reliable Ring Alarm protection. Its armed with a powerful siren, plus built-in backups to help keep you secure for up to 24 hours if you lose power or internet.1Add Ring Alarm Sensors.", "assets/images/A1.jpg", 269.99000000000001, 0.0, 9, "Alarm Base Station", "alarm" },
                    { 13, "Take up to 18 months to pay with as low as 0% APR on some term lengths and no late fees", "assets/images/A4.jpg", 65.0, 0.0, 3, "DÉCLENCHEUR MANUEL", "alarm" },
                    { 14, "Vidéo 2K avancée avec multiples options d'alimentation.", "assets/images/C4.jpg", 119.98999999999999, 0.0, 5, "CAMÉRA PTZ DAHUA 2MP", "camera" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequests_UtilisateurId",
                table: "ServiceRequests",
                column: "UtilisateurId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Articles");

            migrationBuilder.DropTable(
                name: "ServiceRequests");

            migrationBuilder.DropTable(
                name: "Utilisateurs");
        }
    }
}
