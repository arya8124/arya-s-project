import { sendEmail } from '../notification/src/emailservices';

const to='';
const subject = 'performance';
const text = `Date: 7/11/2024

Employer’s name: Arya Sarfare

Re: Warning notice for poor performance

Dear Arya,

Your performance is consistently falling short of our standards. You aren’t meeting assigned deadlines, delivering quality work or reaching your individual goals.

This letter serves as the first official warning and enlightens you about the consequences if you fail to improve. You are given a duration of 1 week to take the actions listed and ameliorate your unsatisfactory performance.

If you choose to ignore this warning or fail to make a mark by the allotted time, we may have to take stricter actions, including suspension and termination.

Please note that this letter isn’t to discourage you but to understand your pain points and how we can help you reach your goals. We are confident that you will come out brighter on the other side.

However, you may contact me directly if you want to appeal against this decision or discuss anything related to this letter.

Best,

Joseph George`;
sendEmail(to,subject, text);
