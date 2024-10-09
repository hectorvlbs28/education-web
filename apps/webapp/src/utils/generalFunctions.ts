import DocumentationFile from '../interfaces/DocumentationFile';

export const isStringNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const base64ToBlob = (base64: string, mimeType: string) => {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
};

export const formatToISO = (dateStr: string) => {
  const date = new Date(new Date(dateStr).toISOString());

  date.setUTCHours(0, 0, 0, 0);

  return date.toISOString();
};

export const stringToNumber = (value: string) => {
  return parseInt(value, 10);
};

export const numberToString = (value: number) => {
  return value.toString();
};

export const appendFileToFormData = (
  doc: DocumentationFile,
  key: string,
  formData: FormData,
  types: string[]
) => {
  const mimeType = doc.file.split(';')[0].split(':')[1];
  const blob = base64ToBlob(doc.file, mimeType);
  formData.append('files', blob, doc.fileName);
  types.push(key);
};

export const formatCourses = (courses: any[]) =>
  courses.map((course) => ({
    courseId: course.id,
    contract: {
      contractId: course.contract.id,
      signature: course.contract.signature,
    },
  }));

export const formatPrice = (price: number) => {
  return `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MXN`;
};

export const getInitials = (name: string) => {
  const nameArray = name.split(' ');
  const initials = nameArray[0].charAt(0) + nameArray[1].charAt(0);
  return initials;
};
