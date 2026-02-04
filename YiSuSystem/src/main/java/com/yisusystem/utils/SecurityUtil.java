package com.yisusystem.utils;

import com.yisusystem.common.MyUserDetail;
import com.yisusystem.pojo.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * @author Nefelibeta
 */
public final class SecurityUtil {
    public static User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof MyUserDetail myUserDetail) {
            return myUserDetail.getUser();
        }
        return null;
    }
}
