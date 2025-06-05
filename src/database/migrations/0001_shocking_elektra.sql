CREATE TYPE "public"."tarot_element_type" AS ENUM('fire', 'water', 'air', 'earth');--> statement-breakpoint
CREATE TABLE "tarots" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(10) NOT NULL,
	"element" "tarot_element_type" NOT NULL,
	"image_path" text NOT NULL
);
