import { Request, Response } from 'express';

export const validateDepartmentName = (req: Request, res: Response, next: any) => {
    const departmentName = req.query.department;
    if (!departmentName) {
        return res.status(400).json({ error: 'Department is required!' });
    }
    next();
}