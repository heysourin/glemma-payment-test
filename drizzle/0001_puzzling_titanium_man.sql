CREATE TABLE "analysis_log" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "analysis_log" ADD CONSTRAINT "analysis_log_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "analysis_log_userId_idx" ON "analysis_log" USING btree ("user_id");