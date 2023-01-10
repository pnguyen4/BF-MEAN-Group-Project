import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pending' })
export class PendingPipe implements PipeTransform {
  transform(applications: any) {
    return applications.filter((application: any) => application?.status == "pending");
  }
}

@Pipe({ name: 'rejected' })
export class RejectedPipe implements PipeTransform {
  transform(applications: any) {
    return applications.filter((application: any) => application?.status == "rejected");
  }
}

@Pipe({ name: 'approved' })
export class ApprovedPipe implements PipeTransform {
  transform(applications: any) {
    return applications.filter((application: any) => application?.status == "approved");
  }
}
