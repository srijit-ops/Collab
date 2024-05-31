import {
    clerkMiddleware,
    createRouteMatcher
  } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
  
  const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);
  
  export default clerkMiddleware((auth, request) => {
    if(auth().userId && isPublicRoute(request)){
        let path= '/select-org'
        if(auth().orgId){
            path= `/organization/${auth().orgId}`
        }
        const orgSelection= new URL(path, request.url)
        return NextResponse.redirect(orgSelection)
    }
    if(!isPublicRoute(request)) {
      auth().protect();
    }
    if(auth().userId && !auth().orgId && request.nextUrl.pathname!=='/select-org'){ //suppose the user is logged in, but has created no orgs, and trying to access other protected pages of our app, then we have to force them to go to select org and create an org first to continue with our app.
        const orgSelection= new URL('/select-org', request.url)
        return NextResponse.redirect(orgSelection)
    }
  });
  
  export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  }