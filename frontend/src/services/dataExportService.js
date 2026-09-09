export const exportUserDataAsJSON = (userId, allUserData) => {
  const exportPayload = {
    exportedAt: new Date().toISOString(),
    version: 'LifeOS_v2.0',
    userId,
    data: allUserData
  };
  const jsonStr = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lifeos_backup_${userId}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  return true;
};
