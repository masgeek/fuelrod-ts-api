-- CreateTable
CREATE TABLE `campaign_outbox` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NULL,
    `campaign_id` BIGINT NULL,
    `message_hash` VARCHAR(150) NULL,
    `date_time` VARCHAR(100) NULL,
    `message_id` VARCHAR(255) NULL,
    `sender_id` VARCHAR(15) NULL,
    `currency` VARCHAR(4) NULL,
    `currency_rate` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `phone_number` VARCHAR(150) NULL,
    `sms_text` TEXT NULL,
    `network_code` BIGINT NULL DEFAULT 0,
    `character_count` INTEGER NULL,
    `sms_count` INTEGER NULL,
    `retry_count` INTEGER NULL DEFAULT 0,
    `single_sms_cost` DECIMAL(10, 2) NULL,
    `message_string_cost` VARCHAR(25) NULL,
    `message_cost` DECIMAL(10, 2) NULL,
    `actual_cost` DECIMAL(10, 2) NULL,
    `delivery_status` VARCHAR(100) NULL,
    `message_delivered` BIT(1) NULL DEFAULT (b'0'),
    `failure_reason` VARCHAR(100) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_network_code`(`network_code`),
    INDEX `idx-actual-cost`(`actual_cost`),
    INDEX `idx-created-at`(`created_at`),
    INDEX `idx-currency`(`currency`),
    INDEX `idx-delivery-status`(`delivery_status`),
    INDEX `idx-message-id`(`message_id`),
    INDEX `idx-sms-outbox-hash`(`message_hash`),
    INDEX `idx-sms-outbox-user-id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fuelrod_migration` (
    `ID` VARCHAR(255) NOT NULL,
    `AUTHOR` VARCHAR(255) NOT NULL,
    `FILENAME` VARCHAR(255) NOT NULL,
    `DATEEXECUTED` DATETIME(0) NOT NULL,
    `ORDEREXECUTED` INTEGER NOT NULL,
    `EXECTYPE` VARCHAR(10) NOT NULL,
    `MD5SUM` VARCHAR(35) NULL,
    `DESCRIPTION` VARCHAR(255) NULL,
    `COMMENTS` VARCHAR(255) NULL,
    `TAG` VARCHAR(255) NULL,
    `LIQUIBASE` VARCHAR(20) NULL,
    `CONTEXTS` VARCHAR(255) NULL,
    `LABELS` VARCHAR(255) NULL,
    `DEPLOYMENT_ID` VARCHAR(10) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fuelrod_migration_lock` (
    `ID` INTEGER NOT NULL,
    `LOCKED` BIT(1) NOT NULL,
    `LOCKGRANTED` DATETIME(0) NULL,
    `LOCKEDBY` VARCHAR(255) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incoming_message` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `message_id` VARCHAR(200) NOT NULL,
    `link_id` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `short_code` VARCHAR(50) NOT NULL,
    `date_sent` VARCHAR(30) NULL,
    `phone_number` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message_queue` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `campaign_id` BIGINT NOT NULL,
    `message_hash` VARCHAR(150) NULL,
    `message_status` VARCHAR(100) NULL,
    `message` TEXT NOT NULL,
    `message_length` INTEGER NOT NULL DEFAULT 160,
    `phone_number` VARCHAR(150) NULL,
    `number_valid` BIT(1) NULL DEFAULT (b'0'),
    `sms_count` INTEGER NULL,
    `message_cost` DECIMAL(10, 2) NULL,
    `message_sent` BIT(1) NULL DEFAULT (b'0'),
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk-campaign-id`(`campaign_id`),
    INDEX `idx-message-queue-hash`(`message_hash`),
    INDEX `idx-phone-number`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mobile_network` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `country` VARCHAR(150) NULL,
    `country_code` VARCHAR(5) NULL,
    `mcc_code` INTEGER NULL,
    `mcc_ref` BIGINT NULL,
    `mnc_code` INTEGER NULL,
    `network_name` VARCHAR(200) NULL,
    `mobile_code` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `mcc_ref`(`mcc_ref`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `number_blacklist` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `phone_number` VARCHAR(150) NULL,
    `sender_id` VARCHAR(15) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opt_out` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `sender_id` VARCHAR(15) NULL,
    `phone_number` VARCHAR(25) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `remote_config` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `app_name` VARCHAR(50) NOT NULL,
    `config_name` VARCHAR(50) NOT NULL,
    `config_value` TEXT NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `config-name-uk`(`app_name`, `config_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sms_campaign` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_uuid` VARCHAR(64) NOT NULL,
    `campaign_name` VARCHAR(255) NOT NULL,
    `campaign_status` VARCHAR(100) NULL,
    `is_draft` BIT(1) NULL DEFAULT (b'1'),
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx-campaign-status`(`campaign_status`),
    INDEX `user-campaign-uid-fk`(`user_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sms_outbox` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NULL,
    `campaign_id` BIGINT NULL,
    `message_hash` VARCHAR(150) NULL,
    `date_time` VARCHAR(100) NULL,
    `message_id` VARCHAR(255) NULL,
    `sender_id` VARCHAR(15) NULL,
    `currency` VARCHAR(4) NULL,
    `currency_rate` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `phone_number` VARCHAR(150) NULL,
    `sms_text` TEXT NULL,
    `network_code` BIGINT NULL DEFAULT 0,
    `character_count` INTEGER NULL,
    `sms_count` INTEGER NULL,
    `retry_count` INTEGER NULL DEFAULT 0,
    `single_sms_cost` DECIMAL(10, 2) NULL,
    `message_string_cost` VARCHAR(25) NULL,
    `message_cost` DECIMAL(10, 2) NULL,
    `actual_cost` DECIMAL(10, 2) NULL,
    `delivery_status` VARCHAR(100) NULL,
    `message_delivered` BIT(1) NULL DEFAULT (b'0'),
    `failure_reason` VARCHAR(100) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_network_code`(`network_code`),
    INDEX `idx-actual-cost`(`actual_cost`),
    INDEX `idx-created-at`(`created_at`),
    INDEX `idx-currency`(`currency`),
    INDEX `idx-delivery-status`(`delivery_status`),
    INDEX `idx-message-id`(`message_id`),
    INDEX `idx-sms-outbox-hash`(`message_hash`),
    INDEX `idx-sms-outbox-user-id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sms_stats` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `user_uuid` VARCHAR(64) NULL,
    `message_cost` DECIMAL(10, 2) NOT NULL,
    `message_count` BIGINT NOT NULL,
    `message_date` DATE NULL,

    INDEX `fk-sms-stats-user-id`(`user_id`),
    INDEX `idx-message-date`(`message_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `untracked_callback` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `message_id` VARCHAR(250) NOT NULL,
    `network_code` VARCHAR(50) NULL,
    `phone_number` VARCHAR(100) NULL,
    `message_status` VARCHAR(100) NULL,
    `retry_count` INTEGER NULL,
    `failure_reason` VARCHAR(100) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_api_config` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_uuid` VARCHAR(64) NOT NULL,
    `msg_service` VARCHAR(20) NOT NULL,
    `service_type` VARCHAR(10) NULL DEFAULT 'BULK_SMS',
    `sender_id` VARCHAR(11) NULL,
    `active` BIT(1) NULL DEFAULT (b'0'),
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_uid_fk`(`user_uuid`),
    UNIQUE INDEX `unique_user_sender_id`(`id`, `sender_id`),
    UNIQUE INDEX `unique_user_service`(`id`, `msg_service`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_sms_credit` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_uuid` VARCHAR(64) NOT NULL,
    `credit_amount` DECIMAL(10, 2) NOT NULL,
    `remarks` VARCHAR(150) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx-credit-amount`(`credit_amount`),
    INDEX `user-credit-uid-fk`(`user_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_tokens` (
    `id` VARCHAR(64) NOT NULL,
    `user_name` VARCHAR(18) NULL,
    `token` VARCHAR(200) NULL,
    `expiry_date` DATETIME(0) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `unique_jwt_token`(`token`),
    INDEX `jwt_token_username`(`user_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(64) NOT NULL,
    `username` VARCHAR(18) NULL,
    `user_role` VARCHAR(8) NOT NULL DEFAULT 'USER',
    `client_name` VARCHAR(200) NULL,
    `user_email` VARCHAR(50) NULL,
    `password` VARCHAR(200) NULL,
    `message_cost` DECIMAL(10, 2) NULL DEFAULT 1.50,
    `overdraft` BIT(1) NULL,
    `enabled` BIT(1) NULL,
    `flag_reason` VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `user_uuid_uk`(`uuid`),
    UNIQUE INDEX `user_name`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `message_queue` ADD CONSTRAINT `fk-campaign-id` FOREIGN KEY (`campaign_id`) REFERENCES `sms_campaign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sms_campaign` ADD CONSTRAINT `user-campaign-uid-fk` FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sms_outbox` ADD CONSTRAINT `fk_network_code` FOREIGN KEY (`network_code`) REFERENCES `mobile_network`(`mcc_ref`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sms_stats` ADD CONSTRAINT `fk-sms-stats-user-id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_api_config` ADD CONSTRAINT `user_uid_fk` FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_sms_credit` ADD CONSTRAINT `user-credit-uid-fk` FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_tokens` ADD CONSTRAINT `jwt_token_username` FOREIGN KEY (`user_name`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE RESTRICT;
