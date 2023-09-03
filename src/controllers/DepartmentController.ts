import { Request, Response } from 'express';
import axios from 'axios';
const cheerio = require('cheerio');

export const getOpenPositions = async (req: Request, res: Response) => {
    try {
        const departmentName = req.query.department as string;
        
        const careerPortalApiUrl: any = process.env.CAREER_PORTAL_API_URL;
        // Make an HTTP GET request to a 3rd party API (example: JSONPlaceholder)
        const response = await axios.get(careerPortalApiUrl);
        // Extract the data from the response
        const data = response.data;
        const $ = cheerio.load(data);
        const viewJobsSection = $('#viewjobs');
        if (viewJobsSection.length > 0) {
            // Find all job-posting elements
            const jobPostings = $('.job-posting');
            // Create an empty object to store job data
            const jobData: any = {};
            jobPostings.each((index: any, element: any) => {
                const department = $(element).find('.department').text().trim();
                let jobNames: any[] = [];
                const temp$ = cheerio.load(element);
                temp$('.job-content .job-name').each((index1: any, childElement: any) => {
                    jobNames.push($(childElement).text().trim());
                });
                jobData[department] = jobNames;
            });
            if (!jobData.hasOwnProperty(departmentName)) {
                return res.status(404).send("No department found!")
            }
            return res.json(jobData[departmentName]);
        } else {
            throw new Error("Section with id 'viewJobs' not found.");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};