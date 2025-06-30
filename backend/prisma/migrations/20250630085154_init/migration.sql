-- CreateTable
CREATE TABLE "Company" (
    "company_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone_number" TEXT,
    "website_url" TEXT,
    "industry" TEXT,
    "employee_size" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Person" (
    "person_id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "department" TEXT,
    "title" TEXT,
    "email" TEXT,
    "phone_mobile" TEXT,
    "phone_direct" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Person_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("company_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BusinessCard" (
    "card_id" TEXT NOT NULL PRIMARY KEY,
    "person_id" TEXT NOT NULL,
    "uploader_user_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "ocr_raw_data" JSONB,
    "exchange_date" DATETIME NOT NULL,
    "exchange_time" TEXT,
    "exchange_location" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "notes" TEXT,
    "tags" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "BusinessCard_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person" ("person_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Interaction" (
    "interaction_id" TEXT NOT NULL PRIMARY KEY,
    "person_id" TEXT NOT NULL,
    "interaction_date" DATETIME NOT NULL,
    "interaction_type" TEXT NOT NULL,
    "purpose" TEXT,
    "details" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Interaction_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person" ("person_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
