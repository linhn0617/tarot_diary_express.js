CREATE TABLE "diaries" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_entry_text" text NOT NULL,
	"user_id" integer NOT NULL,
	"tarot_specification_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "diaries" ADD CONSTRAINT "diaries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diaries" ADD CONSTRAINT "diaries_tarot_specification_id_tarot_specifications_id_fk" FOREIGN KEY ("tarot_specification_id") REFERENCES "public"."tarot_specifications"("id") ON DELETE cascade ON UPDATE no action;