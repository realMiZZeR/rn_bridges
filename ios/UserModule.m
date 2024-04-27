//
//  UserModule.m
//  rn_bridges
//
//  Created by Максим Николаев on 27.04.2024.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(UserModule, NSObject)

RCT_EXTERN_METHOD(getUser: (nonnull NSNumber *)id resolve: (RCTPromiseResolveBlock)resolve reject: (RCTPromiseRejectBlock)reject)

@end
