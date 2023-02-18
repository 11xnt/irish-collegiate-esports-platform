-- CreateTable
CREATE TABLE "Tournament" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "organiser" TEXT NOT NULL,
    "prizePool" INTEGER,
    "maxTeams" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameName" TEXT NOT NULL,
    CONSTRAINT "Tournament_gameName_fkey" FOREIGN KEY ("gameName") REFERENCES "Game" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "abbrev" TEXT NOT NULL DEFAULT 'N/A'
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userRole" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleType" TEXT NOT NULL,
    CONSTRAINT "User_userRole_fkey" FOREIGN KEY ("userRole") REFERENCES "Role" ("type") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "_TeamToTournament" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TeamToTournament_A_fkey" FOREIGN KEY ("A") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TeamToTournament_B_fkey" FOREIGN KEY ("B") REFERENCES "Tournament" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_name_key" ON "Tournament"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_type_key" ON "Role"("type");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToTournament_AB_unique" ON "_TeamToTournament"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToTournament_B_index" ON "_TeamToTournament"("B");
