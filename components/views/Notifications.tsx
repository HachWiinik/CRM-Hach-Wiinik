
import React from 'react';
import Panel from '../common/Panel';
import Button from '../common/Button';
import { Save } from 'lucide-react';

const NotificationTemplate = ({ title, description, emailDefault, smsDefault }: { title: string, description: string, emailDefault: string, smsDefault: string }) => (
  <div className="border-b pb-6 mb-6">
    <div className="flex justify-between items-center mb-3">
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
       <div className="flex items-center">
        <span className="mr-2 text-sm">Active</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maya-caribbean-turquoise"></div>
        </label>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email Template</label>
        <textarea defaultValue={emailDefault} rows={5} className="w-full p-2 border rounded-md focus:ring-maya-caribbean-turquoise focus:border-maya-caribbean-turquoise"></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">SMS Template</label>
        <textarea defaultValue={smsDefault} rows={5} className="w-full p-2 border rounded-md focus:ring-maya-caribbean-turquoise focus:border-maya-caribbean-turquoise"></textarea>
      </div>
    </div>
  </div>
);

const Notifications = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-heading">Notification Settings</h2>
      <Panel>
        <h3 className="text-xl font-semibold mb-4 font-heading">Pre-Tour Notifications</h3>
        <NotificationTemplate 
          title="Booking Confirmation"
          description="Sent immediately after booking is confirmed"
          emailDefault="Hello {CLIENT_NAME}, Thank you for booking with Hach Wíinik! Your {PACKAGE_NAME} tour is confirmed for {START_DATE}."
          smsDefault="Hach Wíinik: Your {PACKAGE_NAME} tour is confirmed for {START_DATE}. Check email for details."
        />
        <NotificationTemplate 
          title="Pre-Tour Reminder"
          description="Sent 3 days before tour date"
          emailDefault="Hello {CLIENT_NAME}, Your {PACKAGE_NAME} experience is just 3 days away! Here's what to bring..."
          smsDefault="Hach Wíinik reminder: Your tour is in 3 days! Bring: comfortable shoes, light clothes, sunscreen."
        />

        <h3 className="text-xl font-semibold my-4 font-heading">Post-Tour Notifications</h3>
         <NotificationTemplate 
          title="Thank You & Feedback Request"
          description="Sent 1 day after tour completion"
          emailDefault="Hello {CLIENT_NAME}, Thank you for exploring the Mayan world with us! We'd love to hear about your experience: {FEEDBACK_LINK}"
          smsDefault="Hach Wíinik thanks you! How was your experience with us? Share your thoughts: {FEEDBACK_LINK}"
        />
        
        <div className="mt-6 flex justify-end">
            <Button><Save className="inline-block mr-2" size={16}/> Save Settings</Button>
        </div>
      </Panel>
    </div>
  );
};

export default Notifications;
