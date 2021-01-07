const frontendURL = '/search';

const routeToSearch = (q?: string, near?: string) => {
    return `${frontendURL}?q=${q}&near=${near}`;
}
  
export default { routeToSearch };