//
//  TodoService.m
//  rn_bridges
//
//  Created by Максим Николаев on 18.04.2024.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(TodoModule, RCTEventEmitter)

RCT_EXTERN_METHOD(fetchTodos)

@end
