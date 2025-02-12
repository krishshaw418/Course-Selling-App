const { Worker } = require("bullmq");
const client = require("./RedisClient");
const { sendOtp } = require("./otpService");

const otpWorker = new Worker(
    "otp-verification",
    async (job) => {
        try {
            const { email } = job.data;
            console.log(`Processing job: ${job.id} for email: ${email}`);

            const response = await sendOtp(email);
            console.log(`OTP sent successfully to: ${email}`, response);
            
            return response;
        } catch (error) {
            console.error(`Job ${job.id} failed for ${job.data.email}:`, error);
            throw error;
        }
    },
    { connection: client }
);

otpWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed!`);
});

otpWorker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
});

module.exports = otpWorker;