using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendSecurite.Migrations
{
    /// <inheritdoc />
    public partial class AjoutPanierItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PanierItems_Utilisateurs_UtilisateurId",
                table: "PanierItems");

            migrationBuilder.DropIndex(
                name: "IX_PanierItems_UtilisateurId",
                table: "PanierItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_PanierItems_UtilisateurId",
                table: "PanierItems",
                column: "UtilisateurId");

            migrationBuilder.AddForeignKey(
                name: "FK_PanierItems_Utilisateurs_UtilisateurId",
                table: "PanierItems",
                column: "UtilisateurId",
                principalTable: "Utilisateurs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
