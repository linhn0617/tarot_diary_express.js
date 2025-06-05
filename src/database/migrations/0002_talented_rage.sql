CREATE TABLE "tarot_specifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"tarot_id" integer NOT NULL,
	"is_upright" boolean NOT NULL,
	"message1" varchar(255),
	"message2" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "tarot_specifications" ADD CONSTRAINT "tarot_specifications_tarot_id_tarots_id_fk" FOREIGN KEY ("tarot_id") REFERENCES "public"."tarots"("id") ON DELETE cascade ON UPDATE no action;