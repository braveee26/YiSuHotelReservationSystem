package com.yisusystem.filter;

import com.yisusystem.common.HttpStatus;
import com.yisusystem.config.WhiteListConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.annotation.Resource;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import com.yisusystem.common.HttpStatus;
import com.yisusystem.common.MyUserDetail;
import com.yisusystem.common.Response;
//import com.yisusystem.config.WhiteListConfig;
import com.yisusystem.pojo.entity.User;
import com.yisusystem.service.IUserService;
import com.yisusystem.utils.JwtUtil;
import com.yisusystem.utils.ServletUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.PathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT 认证过滤器
 * @author 代征诚
 */
@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Resource
    private IUserService userService;
    @Resource
    private PathMatcher pathMatcher;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        Integer userId = null;

        for (String pattern : WhiteListConfig.getWHITE_LIST()) {
            if (pathMatcher.match(pattern, request.getRequestURI())) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                Claims claims = JwtUtil.parseToken(token);
                userId = Integer.parseInt(claims.getSubject());
            } catch (JwtException exception) {
                System.err.println(exception.getMessage());
            }
        }

        if (userId != null) {
            User user = userService.getUserById(userId);
            if (user == null) {
                ServletUtil.rewrite(response, Response.error(HttpStatus.UserNotFound));
                return;
            } else {
                if (JwtUtil.validateToken(token)) {
                    MyUserDetail myUserDetail = new MyUserDetail(user);
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            myUserDetail, null, myUserDetail.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
